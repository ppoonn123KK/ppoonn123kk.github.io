document.addEventListener('click', (event) => {
  if (event.defaultPrevented) return;
  const searchLink = event.target.closest?.('a[data-search-cta]');
  const affiliateLink = event.target.closest?.('a[data-affiliate-cta]');
  if (!searchLink && !affiliateLink) return;
  const params = searchLink ? {
    content_id: document.body.dataset.contentId,
    cta_id: searchLink.dataset.searchCta,
    target_function: searchLink.dataset.targetFunction,
    transport_type: 'beacon',
  } : {
    content_id: document.body.dataset.contentId,
    affiliate_id: affiliateLink.dataset.affiliateCta,
    placement: affiliateLink.dataset.placement,
    transport_type: 'beacon',
  };
  const eventName = searchLink ? 'article_search_click' : 'affiliate_click';
  if (document.body.dataset.preview === 'true') {
    window.dispatchEvent(new CustomEvent(
      searchLink ? 'content-pilot-click' : 'content-pilot-affiliate-click',
      { detail: params },
    ));
    return;
  }
  try { window.gtag?.('event', eventName, params); }
  catch { /* 計測の失敗でもリンク遷移を続ける。 */ }
});
