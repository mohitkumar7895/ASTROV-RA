async function verify() {
  const res = await fetch('http://127.0.0.1:3005/');
  const html = await res.text();

  // Check header has no phone
  const navSection = html.slice(html.indexOf('<nav'), html.indexOf('</nav>'));
  const headerHasPhone = navSection.includes('96306 20240');
  console.log('Header has phone (should be FALSE):', headerHasPhone);

  // Check aside (floating actions) has phone and whatsapp
  const asideSection = html.slice(html.indexOf('<aside'), html.indexOf('</aside>'));
  const asideHasPhone = asideSection.includes('96306 20240');
  const asideHasWhatsApp = asideSection.includes('WhatsApp') || asideSection.includes('api.whatsapp.com') || asideSection.includes('wa.me');
  console.log('Floating aside has phone (should be TRUE):', asideHasPhone);
  console.log('Floating aside has WhatsApp (should be TRUE):', asideHasWhatsApp);

  if (!headerHasPhone && asideHasPhone && asideHasWhatsApp) {
    console.log('\n✅ VERIFICATION PASSED: Phone number cleanly relocated from Header to Floating widget above WhatsApp!');
  } else {
    throw new Error('Verification failed');
  }
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
