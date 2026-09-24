# ============================================================
#  自动补全 / 修正文章 frontmatter 里的 category 字段
# ------------------------------------------------------------
#  规则（按文件所在目录判断，这是唯一可靠的依据）：
#    docs/blog/life/*.md  ->  category: 生活随笔
#    docs/blog/tech/*.md  ->  category: 笔记
#
#  行为：
#    - 没有 category       -> 在 date 后面插入一行
#    - 有但值不对          -> 只替换那一行的值
#    - 已经正确            -> 完全不动这个文件（不会产生多余 diff）
#    - 没有 date 行        -> 插在 title 后面
#    - 完全没 frontmatter  -> 跳过，并打印警告（这种情况要人工处理）
#
#  设计要点：只改 category 那一行，不重写整个文件，
#  这样可以避免把 CRLF 换行符和文件编码搅乱。
#
#  用法：
#    pwsh -File scripts/fix-category.ps1
#    （在仓库根目录执行；脚本自己会切到仓库根）
# ============================================================

$ErrorActionPreference = 'Stop'

# 切到仓库根目录（脚本在 scripts/ 下）
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$lifeDir = Join-Path $repoRoot 'docs/blog/life'
$techDir = Join-Path $repoRoot 'docs/blog/tech'

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$changedFiles = New-Object System.Collections.Generic.List[string]
$skipped = New-Object System.Collections.Generic.List[string]

function Fix-Directory {
  param(
    [string]$Dir,
    [string]$Category
  )

  if (-not (Test-Path $Dir)) {
    Write-Host "  目录不存在，跳过: $Dir"
    return
  }

  # index.md 是栏目首页，不是文章，不动它
  $files = Get-ChildItem -Path $Dir -Filter '*.md' -File | Where-Object { $_.Name -ne 'index.md' }

  foreach ($file in $files) {
    $rel = $file.FullName.Replace("$repoRoot\", '').Replace('\', '/')
    $text = [System.IO.File]::ReadAllText($file.FullName, $utf8NoBom)

    # 判断换行符风格，插入新行时保持一致
    $eol = if ($text.Contains("`r`n")) { "`r`n" } else { "`n" }

    # frontmatter 必须是文件开头的 --- ... ---
    if (-not $text.StartsWith('---')) {
      $skipped.Add("$rel  （没有 frontmatter，需手动补）")
      continue
    }

    # 判断 category 当前状态
    if ($text -match '(?m)^category:\s*(.+?)\s*$') {
      $current = $Matches[1].Trim()
      if ($current -eq $Category) {
        continue # 已经正确，一个字节都不动
      }
      # 值不对：只替换值，保留原来的空白与换行
      $pattern = '(?m)^(category:\s*).+?\s*$'
      $newText = [regex]::Replace($text, $pattern, ('${1}' + $Category), 1)
    }
    else {
      # 没有 category：插在 date 行后面；没有 date 就插在 title 后面
      $anchor = $null
      if ($text -match '(?m)^date:.*$') { $anchor = 'date' }
      elseif ($text -match '(?m)^title:.*$') { $anchor = 'title' }

      if (-not $anchor) {
        $skipped.Add("$rel  （frontmatter 里既没有 title 也没有 date）")
        continue
      }

      # 注意：不要在双引号字符串里直接拼 :* 这类字符，PowerShell 会把 `: 当转义。
      # 先算好正则和替换串，再用 -replace。
      $pattern = '(?m)^' + $anchor + ':.*$'
      $replacement = '$0' + $eol + 'category: ' + $Category
      $newText = [regex]::Replace($text, $pattern, $replacement, 1)
    }

    if ($newText -ne $text) {
      [System.IO.File]::WriteAllText($file.FullName, $newText, $utf8NoBom)
      $changedFiles.Add("$rel  ->  $Category")
    }
  }
}

Write-Host '正在检查文章分类…'
Fix-Directory -Dir $lifeDir -Category '生活随笔'
Fix-Directory -Dir $techDir -Category '笔记'

if ($changedFiles.Count -eq 0) {
  Write-Host '所有文章的 category 都已正确，无需修改。'
}
else {
  Write-Host "已修正 $($changedFiles.Count) 个文件："
  $changedFiles | ForEach-Object { Write-Host "  $_" }
}

if ($skipped.Count -gt 0) {
  Write-Host "需要人工处理 $($skipped.Count) 个文件："
  $skipped | ForEach-Object { Write-Host "  $_" }
}
