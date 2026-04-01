const fs = require('fs');
const path = require('path');

const DIR = 'C:/Users/Moein-HQ/.local/bin/opticnotes/posts';

const tldrs = {
  'oversized-glasses-trend.html': 'Oversized glasses look best when the lens height is tall but the frame width stays close to your face width. Strong prescriptions above +/- 4.00 make oversized impractical due to thick edges and distortion. The trend is real, but proportion and fit matter more than just going big.',
  'photochromic-lenses-cold-weather.html': 'Photochromic lenses darken more and stay dark longer in cold weather, making them excellent for Edmonton winters outdoors. The trade-off is they take 5 to 8 minutes to clear indoors at -20\u00B0C. They will not darken inside your car regardless of temperature because the windshield blocks UV.',
  'pink-eye-treatment.html': 'Pink eye has three types (bacterial, viral, allergic) and only bacterial responds to antibiotic drops. See your doctor for a proper diagnosis before treating, because the wrong treatment wastes time and may delay recovery. Most pink eye is viral and resolves on its own within 7 to 14 days.',
  'polarized-vs-non-polarized.html': 'Polarized sunglasses eliminate glare from reflective surfaces like roads, water, and snow, while non-polarized just dim everything equally. For 95% of people and activities, polarized is the better choice. The only real exceptions are pilots and people who read outdoor LCD screens for work.',
  'polysporin-eye-drops.html': 'Polysporin eye drops are an OTC antibiotic available in Canada that only treats bacterial pink eye. They do not work on viral infections, allergies, styes, or dry eyes. Always see your doctor for a proper diagnosis before using them, and finish the full 7 to 10 day course.',
  'precision1-vs-acuvue-oasys.html': 'Precision1 uses a moisture-rich surface layer that holds up well for screen-heavy days and dry environments. Acuvue Oasys 1-Day integrates tear-like molecules for a thinner, barely-there feel with UV protection. Neither is universally better; the right choice depends on your tear chemistry and daily routine.',
  'prescription-smart-glasses-2026.html': 'Ray-Ban Meta is the most complete prescription smart glasses option in Canada in 2026, with audio, camera, AI, and full Rx lens support. A complete setup costs $580 to $1,080 CAD including prescription lenses. Other options are either niche, being phased out, or not yet consumer-ready.',
  'progressive-lenses-adjustment.html': 'Progressive lenses have a clear-vision corridor down the centre with intentional soft blur at the edges. Most people adjust within 1 to 2 weeks of full-time wear by turning their head instead of just their eyes. If things still feel wrong after 2 weeks, go back to your optician for a fitting check before blaming the lenses.',
  'rayban-meta-review.html': 'After 30 days of daily wear, Ray-Ban Meta earned a permanent spot in the rotation for hands-free calls, quick photo capture, and casual audio. Battery life of 4 to 6 hours is the main limitation, and wind kills call quality outdoors. Adding prescription lenses transforms the value since they become your actual everyday glasses.',
  'reading-glasses-vs-prescription.html': 'Over-the-counter reading glasses work perfectly well if both eyes have similar near-vision needs, you have no significant astigmatism, and your distance vision is fine. You need a prescription if your eyes have different powers, you have astigmatism above 0.75D, or you need clear vision at computer distance. Either way, get an eye exam first.',
  'red-eyes-causes.html': 'Most red eyes are caused by dry eye disease, digital eye strain, or allergies, all of which are manageable with the right drops and habits. Redness-relief drops like Visine cause rebound redness with regular use and should be avoided long-term. See a doctor urgently if red eyes come with severe pain, vision changes, or light sensitivity.',
  'rimless-glasses.html': 'Rimless glasses are the lightest and most minimal frame style, but they are inherently more fragile than full-rim frames because the lenses are held by drill-mounted screws. They look best with prescriptions between -4.00 and +3.00, and Trivex is the safest lens material due to its crack resistance at the drill points.',
  'scleral-lenses-guide.html': 'Scleral lenses vault over the entire cornea and rest on the white of the eye, providing sharp vision for keratoconus and constant hydration for severe dry eyes. They cost $1,000 to $3,000 per pair in Canada and last 1 to 2 years. Most patients learn comfortable insertion within 1 to 2 weeks of practice.',
  'signs-you-need-glasses.html': 'The five most common signs are persistent headaches after visual tasks, squinting at distance, holding your phone at arm\u2019s length, night driving difficulty, and chronic eye fatigue. Your brain compensates gradually, so most people do not realize they need glasses until someone points it out or they finally get an exam.',
  'sleeping-in-contacts.html': 'Sleeping in contacts raises your corneal infection risk 6 to 8 times, even for just one night. If you accidentally fall asleep in them, use rewetting drops and wait 10 to 15 minutes before removing. Daily disposable lenses are the simplest way to eliminate the temptation entirely.',
  'stellest-vs-miyosmart.html': 'Both Stellest and MiYOSMART slow myopia progression in children by roughly 60% compared to standard lenses, and neither is objectively better than the other. They are designed for ages 6 to 16 and cost $400 to $700 per pair of lenses in Canada. Starting earlier provides more cumulative benefit over the growth years.',
  'stye-treatment.html': 'A stye is an infected oil gland on your eyelid, not a pimple. Never squeeze it. Warm compresses for 10 to 15 minutes, 3 to 4 times daily, are the standard first-line treatment. See your doctor if it has not improved after two weeks or if swelling spreads beyond the eyelid.',
  'stye-vs-chalazion.html': 'A stye is an acute bacterial infection that hurts and resolves in 1 to 2 weeks. A chalazion is a chronic blocked gland that is usually painless but can last months. Both respond to warm compresses, but chalazia often need more patience or a minor in-office procedure if they do not resolve.',
  'sudden-blurry-vision.html': 'Gradual blurriness over weeks usually means a prescription change or dry eyes. Sudden blurriness over minutes or hours, especially in one eye or with pain, flashes, or neurological symptoms, can be a medical emergency like retinal detachment, stroke, or acute glaucoma. If your vision changed suddenly, stop reading and go to the ER.',
  'thealoz-duo-review.html': 'Thealoz Duo combines trehalose (which protects corneal cells from dryness damage) with hyaluronic acid (which holds moisture on the eye surface) in a preservative-free multi-dose bottle. It tends to provide longer-lasting comfort than standard drops like Systane or Refresh, especially for moderate to severe dry eye and contact lens wearers. A 10 mL bottle costs $22 to $30 in Canada.',
  'thealoz-duo-vs-systane.html': 'Thealoz Duo works best for aqueous-deficient dry eye and contact lens wearers, while Systane Complete is better for evaporative dry eye caused by meibomian gland dysfunction. Neither is universally better. If you use drops more than 4 times a day, choose a preservative-free option regardless of brand.',
  'titanium-glasses-frames.html': 'Titanium frames are 40% lighter than steel, spring back to shape after bending, and never corrode from sweat. They cost more upfront but often last 5 to 7 years, outlasting multiple prescription cycles. For active lifestyles, the combination of weight, strength, and durability is unmatched by any other frame material.',
  'transitions-vs-polarized.html': 'Transition lenses auto-darken for convenience (one pair for indoors and outdoors) but do not cut glare and barely work behind a car windshield. Polarized sunglasses eliminate reflected glare from roads, water, and snow but are always tinted. The ideal setup is transitions on your everyday glasses and a dedicated pair of polarized sunglasses for driving.',
  'varilux-lenses-review.html': 'Varilux progressive lenses range from Comfort ($350\u2013$450) to XR Series ($650\u2013$850), with each tier offering wider reading corridors and less peripheral distortion. The fitting matters more than the brand name: a well-fitted mid-range progressive outperforms a poorly fitted premium one every time. Crizal Sapphire or Rock coating is worth adding if you are investing in quality lenses.',
  'vision-benefits-expire.html': 'Most employer vision plans in Canada reset January 1, and unused benefits do not carry over. Book your eye exam by mid-October to avoid the November-December rush, and order glasses by mid-November to ensure lab completion before year-end. Consider prescription sunglasses, computer glasses, or a backup pair to use any remaining allowance.',
  'vitalux-advanced-vs-regular.html': 'Vitalux Advanced matches the AREDS2 clinical formula with high-dose nutrients proven to slow AMD progression by 25% over five years. Vitalux Healthy Eyes has much lower doses and is designed for general eye nutrition, not AMD treatment. Ask your eye doctor which formula matches your retinal health before buying.',
  'vitalux-eye-vitamins.html': 'Vitalux Advanced is based on the AREDS 2 clinical trial and is designed for people with diagnosed macular degeneration, not as a general vitamin for everyone. Current formulas no longer contain beta-carotene, so the cancer concern from the original AREDS study does not apply. Talk to your optometrist about which version, if any, makes sense for your eyes.',
};

const howToSchemas = {
  'sleeping-in-contacts.html': `
  <!-- HowTo Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Safely Remove Contact Lenses After Sleeping in Them",
    "description": "Step-by-step instructions for safely removing contact lenses after accidentally sleeping in them overnight.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Apply rewetting drops",
        "text": "Put rewetting drops or sterile saline in your eyes. If you do not have rewetting drops, sterile saline (not tap water) works."
      },
      {
        "@type": "HowToStep",
        "name": "Wait for lenses to rehydrate",
        "text": "Wait 10 to 15 minutes. Blink gently. Let the lens rehydrate and loosen from the corneal surface."
      },
      {
        "@type": "HowToStep",
        "name": "Test the lens",
        "text": "Look up and try to slide the lens down with your finger. If it moves freely, remove it normally. If still stuck, add more drops and wait longer."
      },
      {
        "@type": "HowToStep",
        "name": "Assess your eyes",
        "text": "After removal, check for redness, pain, blurred vision, or light sensitivity. Mild dryness and slight redness are normal and should resolve within an hour or two."
      },
      {
        "@type": "HowToStep",
        "name": "Give your eyes a break",
        "text": "Wear your glasses for the rest of the day. Let your corneas recover fully before putting lenses back in."
      }
    ]
  }
  </script>`,
  'polysporin-eye-drops.html': `
  <!-- HowTo Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use Polysporin Eye Drops Properly",
    "description": "Step-by-step instructions for correctly applying Polysporin eye drops to treat bacterial eye infections.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Wash your hands",
        "text": "Wash your hands thoroughly with soap and water. This is the most important step to prevent introducing new bacteria."
      },
      {
        "@type": "HowToStep",
        "name": "Tilt your head back",
        "text": "Tilt your head back and look up at the ceiling."
      },
      {
        "@type": "HowToStep",
        "name": "Create a pocket",
        "text": "Pull down your lower eyelid gently to create a small pocket between the lid and your eyeball."
      },
      {
        "@type": "HowToStep",
        "name": "Apply the drop",
        "text": "Hold the dropper above the pocket without touching your eye or eyelid with the tip. Squeeze one drop into the pocket."
      },
      {
        "@type": "HowToStep",
        "name": "Close and press",
        "text": "Close your eye gently for 1 to 2 minutes. Press lightly on the inner corner of your eye near the nose to prevent the drop from draining into your tear duct."
      },
      {
        "@type": "HowToStep",
        "name": "Wipe excess",
        "text": "Wipe away any excess with a clean tissue. Repeat for the other eye if prescribed for both."
      }
    ]
  }
  </script>`
};

function processFile(filename) {
  const filepath = path.join(DIR, filename);
  let html = fs.readFileSync(filepath, 'utf8');
  let changes = [];

  // 1. Add TL;DR before first <h2>
  const tldr = tldrs[filename];
  if (tldr) {
    // Find the first <h2 in the article-content section
    const articleStart = html.indexOf('<article class="article-content">');
    if (articleStart !== -1) {
      const afterArticle = html.indexOf('<h2 ', articleStart);
      if (afterArticle !== -1) {
        const tldrBlock = `<div class="tldr">\n        <strong>TL;DR:</strong> ${tldr}\n      </div>\n\n      `;
        html = html.slice(0, afterArticle) + tldrBlock + html.slice(afterArticle);
        changes.push('TL;DR');
      }
    }
  }

  // 2. Add speakable schema to existing Article/MedicalWebPage JSON-LD
  const speakableBlock = `"speakable": {\n      "@type": "SpeakableSpecification",\n      "cssSelector": [".tldr", ".callout"]\n    }`;

  // Find the first ld+json block with Article or MedicalWebPage
  const ldJsonRegex = /<script type="application\/ld\+json">\s*\{[\s\S]*?"@type":\s*"(Article|MedicalWebPage)"[\s\S]*?\}\s*<\/script>/;
  const ldMatch = html.match(ldJsonRegex);
  if (ldMatch) {
    const block = ldMatch[0];
    // Check if speakable already exists
    if (!block.includes('speakable')) {
      // Find the mainEntityOfPage closing and add speakable after it
      const meopEnd = block.indexOf('"mainEntityOfPage"');
      if (meopEnd !== -1) {
        // Find the closing of mainEntityOfPage object - look for }
        let depth = 0;
        let pos = block.indexOf('{', meopEnd);
        for (let i = pos; i < block.length; i++) {
          if (block[i] === '{') depth++;
          if (block[i] === '}') {
            depth--;
            if (depth === 0) {
              pos = i;
              break;
            }
          }
        }
        // Insert speakable after the mainEntityOfPage closing brace
        const newBlock = block.slice(0, pos + 1) + ',\n    ' + speakableBlock + block.slice(pos + 1);
        html = html.replace(block, newBlock);
        changes.push('speakable');
      }
    }
  }

  // 3. Wrap tables in responsive div (don't double-wrap)
  // Match <table> not preceded by <div class="table-wrap">
  let tableCount = 0;
  html = html.replace(/<table>/g, (match, offset) => {
    // Check if already wrapped (look backwards for table-wrap)
    const before = html.slice(Math.max(0, offset - 100), offset);
    if (before.includes('class="table-wrap"')) {
      return match;
    }
    tableCount++;
    return '<div class="table-wrap">\n      <table>';
  });

  html = html.replace(/<\/table>/g, (match, offset) => {
    // Check if this table was wrapped by looking for our div
    const before = html.slice(Math.max(0, offset - 5000), offset);
    const lastTableWrap = before.lastIndexOf('<div class="table-wrap">');
    const lastCloseDiv = before.lastIndexOf('</div>');
    // If there's a table-wrap div that hasn't been closed by a </div> after it
    if (lastTableWrap !== -1) {
      // Count table-wrap opens vs closes after the last table-wrap
      const segment = before.slice(lastTableWrap);
      const opens = (segment.match(/<div class="table-wrap">/g) || []).length;
      const afterWrap = html.slice(offset);
      return '</table>\n      </div>';
    }
    return match;
  });
  if (tableCount > 0) changes.push(`${tableCount} tables wrapped`);

  // 4. Add HowTo schema
  if (howToSchemas[filename]) {
    if (!html.includes('"HowTo"')) {
      html = html.replace('</head>', howToSchemas[filename] + '\n</head>');
      changes.push('HowTo schema');
    }
  }

  fs.writeFileSync(filepath, html, 'utf8');
  return changes;
}

const files = Object.keys(tldrs);
let successCount = 0;
for (const f of files) {
  try {
    const changes = processFile(f);
    console.log(`[OK] ${f}: ${changes.join(', ')}`);
    successCount++;
  } catch (e) {
    console.log(`[ERR] ${f}: ${e.message}`);
  }
}

console.log(`\nDone: ${successCount}/${files.length} files processed`);
