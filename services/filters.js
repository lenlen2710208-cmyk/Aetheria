export function filterItems(items,{query='',type='Tất cả',attribute='Tất cả',source='Tất cả',rarity='Tất cả'}={}) {
  const q=query.trim().toLowerCase();
  return items.filter(x =>
    (!q || x.name?.toLowerCase().includes(q)) &&
    (type==='Tất cả' || x.type===type) &&
    (source==='Tất cả' || x.source===source) &&
    (rarity==='Tất cả' || String(x.rarity)===String(rarity)) &&
    (attribute==='Tất cả' ||
      x.tags?.includes(attribute) ||
      Object.prototype.hasOwnProperty.call(x.attributes || {}, attribute))
  );
}
