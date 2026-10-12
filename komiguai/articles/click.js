document.addEventListener('click', (event) => {
  const link = event.target.closest?.('a[data-search-cta]');
  if (!link || event.defaultPrevented) return;
  const params = {
    content_id: document.body.dataset.contentId,
    cta_id: link.dataset.searchCta,
    target_function: link.dataset.targetFunction,
    transport_type: 'beacon',
  };
  if (document.body.dataset.preview === 'true') {
    window.dispatchEvent(new CustomEvent('content-pilot-click', { detail: params }));
    return;
  }
  try { window.gtag?.('event', 'article_search_click', params); }
  catch { /* 計測の失敗でもリンク遷移を続ける。 */ }
});
