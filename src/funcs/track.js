function gtag_report_conversion(url) {
  var path = ''
  let gtag;
  if (typeof window !== 'undefined') {
    path = window.location.pathname;
    gtag = window.gtag;
  }
  var callback = function () {
    if (typeof (url) != 'undefined') {
      // window.location = url;
    }
  };
  gtag && gtag('event', 'conversion', {
    'send_to': 'AW-941166757/PVxVCKrDiIoYEKWh5MAD',
    'event_callback': callback,
    'page': path
  });
  return false;
}

export default gtag_report_conversion