// 自适应表格列宽
export function flexColumnWidth(cols) {
  // cols为该列的字段名(传字符串);
  if (!cols || !cols.length || cols.length === 0 || cols === undefined) {
    return
  }
  // 以下分配的单位长度可根据实际需求进行调整
  let flexWidth = 0
  for (const char of cols) {
    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
      // 如果是英文字符，
      flexWidth += 8
    } else if (char >= '\u4e00' && char <= '\u9fa5') {
      // 如果是中文字符，
      flexWidth += 20
    } else {
      // 其他种类字符，为字符分配8个单位宽度
      flexWidth += 8
    }
  }
  if (flexWidth < 80) {
    // 设置最小宽度
    flexWidth = 80
  }
  return flexWidth + 40
}


