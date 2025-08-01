/**
 * Utility for website metadata
 */

/**
 * Website descriptions mapped by domain
 * This is a simple solution to avoid CORS issues with fetching metadata directly
 */
const websiteDescriptions: Record<string, string> = {
  'arnzenarms.com': 'Want to get better at mid and long-range rifle shooting? Or improve your ability to get into stab...  ',
  'shop.gafiringline.com': 'GA Firing Line  ',
  'fenixammunition.com': 'Fenix Ammunition is a Michigan company dedicated to providing high quality ammunition for competi...  ',
  'yoursole.com': 'SOLE insoles and footwear. Arch support shoe inserts for sore feet. Supportive sustainable footwear.  ',
  'daylightcomputer.com': 'Daylight Computer (DC1) is a new kind of calm computer, designed for deep work and health.  ',
  'soapminer.com': 'A RETURN TO NATURE Handmade Tallow Soap This is the soap your great grandma used to make. Gentle,...  ',
  'delgadosfuego.com': 'Don\'t wait any longer - GET FUEGO!  ',
  'peonylanewine.com': 'Peony Lane wine has just one ingredient: grapes. Unlike many wines, even “natural” and “organic,”...  ',
  'anageninc.com': 'Best Pharma-grade Quality RU58841 Pyrilutamide powder and pre-made solutions | Free Shippin...  ',
  'farfetch.com': 'Bitcoin accepting website',
  'wyomingbased.com': 'WB is an outdoor and lifestyle apparel company based in Wyoming, USA. The only ideology we push i...  ',
  'uncute.com': 'We make products to celebrate our differences and do good  ',
  'pay.zaprite.com': 'Zaprite - Pay - Bitcoin accepting website',
  'farmerbillsprovisions.com': 'Farmer Bills. Regenerative grass-fed beef and bison biltong. Grass-fed tallows. Magnesium ta...  ',
  'meileaf.com': 'Mei Leaf was established in London in 2006 (previously called chinalife) to represent true tea cu...  ',
  'smithpastures.com': 'Pasture Raised Poultry  ',
  'based.getchroma.co': 'Take control of your health and mind with purpuse built devices designed to restore your connecti...  ',
  'mushmoresupplements.com': 'MushMore has a mission: and it is to create a sustainably sourced product line that combines mode...  ',
  'lmtdsupply.co': 'LMTD is a surf-inspired Bitcoin lifestyle clothing brand that creates durable, stylish t-shirts a...',
  'acmeacres.us': 'Farm to table, grass fed, pasture raised, no hormones, no antibiotics, no vaccines. Buy beef onli...  ',
  'seedvault.market': 'We provide high-quality vegetable and produce seeds through the Bitcoin network, we promote a sel...',
  'privato.ca': 'Item was successfully added to your cart  ',
  'theleathermint.com': 'Sorry, this product is unavailable. Please choose a different combination.  ',
  'shopinbit.de': 'Bitcoin accepting website',
  'drink-bob.com': 'Welcome to our website! Discover Bitcoin Only Brewery, specialized in craft beers. Order online a...',
  'buybitart.com': 'This website is using a security service to protect itself from online attacks. The action you ju...  ',
  'miningwholesale.eu': 'Welcome to Mining Wholesale. At Mining Wholesale we are specialists in reselling ASIC hardware fo...  ',
  'bitcoinapexart.com': 'bitcoinapexart.com offers unique bitcoin-art worldwide. Bitcoin pencil art.',
  'gobrrr.me': '3D prints for sovereign individuals! We offer Bitcoin nodes, SeedSigner kits & parts, cold st...',
  'driveczech.com': 'English-speaking local drivers.  ',
  'm.alza.cz': 'Just a moment... - Bitcoin accepting website',
  'stackuj.cz': 'Bitcoin',
  'onlinevis.nl': 'Online vis kopen doet u eenvoudig bij Onlinevis.nl. Een mooi assortiment aan online vis beschikba...  ',
  'bitcoinbottles.nl': 'all the way up   ',
  'bitcoindebuut.nl': 'Welkom bij Bitcoin Debuut: dé bitcoin webshop voor Bitcoiners. Leer veilig bitcoin kopen en ontde...',
  'bitcoinfocus.nl': 'De Nederlandse nieuwsbrief met 100% focus op bitcoin en lightning, drie keer per week in je digit...',
  'bitcoinstuffstore.com': 'Ontdek unieke Bitcoin merchandise voor de ultieme fan. Bezoek onze webshop en profiteer van exclu...',
  'bitcointaps.com': 'RENT for your event Show Bitcoin Taps Revolutionizing Drinks with Bitcoin At BitcoinTaps, ...',
  'cafeweltschmerz.nl': 'Kies een bedrag:  ',
  'fuelingyou.nl': 'Bitcoin accepting website',
  'stemlp.nl': 'Bitcoin accepting website',
  'terschellingbricks.nl': 'Terschelling Bricks: LEGO® huren op Terschelling. Bouwplezier voor jong en oud, bij slecht én moo...  ',
  'bvnl.nl': 'BVNL is de enige partij die bij elke keuze altijd het belang van Nederland voorop zet. Alles word...  ',
  'gamekings.tv': 'Elke dag verse videos over de nieuwste games en het laatste gaming nieuws omtrent de PS4, P...  ',
  'voorlopig.fly.dev': 'Kassa - Bitcoin accepting website',
  'palingshop.nl': 'Paling kopen bij Palingshop.nl. Eenvoudig online verse en gerookte paling kopen. Ook andere heerl...  ',
  'phoodfarm.org': 'Phood Farm is dé urban farm die de stad inspireert om regeneratief, zorgzaam en community based t...  ',
  'combipower.nl': 'Bitcoin accepting website',
  'hummingbird.amsterdam': 'Explore the worlds finest coffee brews in our online shop or visit our bar in Amsterdam. Ou...  ',
  'filmweb.pl': 'Filmweb.pl - Filmy takie jak Ty Filmweb to największy i najczęściej odwiedzany polski serwis film...  ',
  'cremitacbd.com': 'You don\'t have permission to access this resource.  ',
  'megatechnica.ge': 'Megatechnica -  საყოფაცხოვრებო ტექნიკა,  ტელევიზორები, კომპიუტერები, მობილურები, მაცივრები და სხვ...  ',
  'supta.ge': 'გაიმარტივე ბიზნესის მომარაგება სუფთასთან ერთად! ჩვენი პლატფორმა 700-მდე დასახელების პროდუქტს უყრი...  ',
  'nlstore.ge': 'NLSTORE - წონის დაკლება უმარტივესად Energy Diet ფრანგული ხარისხი № 1 ფუნქციური საკვები მსოფლიოში!...  ',
  'tmcgeorgia.com': 'Tax Management & Consulting | Audit Company TMC | Georgia Tax Management & Consulting (TM...  ',
  'primestore.ge': 'Primestore.ge-ზე ფართო არჩევანია, თქვენ შეგიძლიათ შეიძინოთ ტექნიკა ყველაზე დაბალ ფასად! მიიღეთ სა...  ',
  'greenlab.ge': 'Bitcoin accepting website',
  'growlab.ge': 'გროულაბი • growlab ჩვენ გთავაზობთ ყველაფერს, რაც მცენარის გასაზრდელად გჭირდებათ: გროუ ტენტ...  ',
  'keylocker.ge': 'გასაღების შემნახველი სეიფები, კარის ჭკვიანი საკეტები ონლაინ მაღაზია. უფასო მიწოდების მომსახურება ...  ',
  'ciel.ge': 'შეიძინე ორიგინალი სუნამოების ონლაინ მაღაზია სიელში პარფიუმერია და მიიღე საჩუქრად სუნამოს ნაკრები ...  ',
  'isari.store': 'ISARI.store არის ქართული ონლაინ სავაჭრო პლატფორმა, რომელიც სთავაზობს მომხმარებლებს ხარისხიან პროდ...  ',
  'isolabellart.it.com': 'Original oil paintings  ',
  'konzum.hr': 'Sve informacije o Konzumu na jednom mjestu - o prodavaonicama, proizvodima, akcijama, nagradnim i...  ',
  'qualidoc.com.br': 'Entrega garantida 365 dias por ano!  ',
  'ecclesiae.com.br': 'O site &eacute; protegido por um servi&ccedil;o de seguran&ccedil;a online que o protege contra a...  ',
  'minebit.com.br': 'Os melhores hardwares de Bitcoin para mineração, carteiras frias e nodes no Brasil!',
  'marketplace.kriptonmarket.com': 'Dejanos tus datos para contactarte.  ',
  'totalplay.com.mx': 'Error 404 - Bitcoin accepting website',
  'elektra.mx': 'Bitcoin accepting website',
  'thegoodbeans.com': 'Single origin specialty coffees roasted at origin shipping directly from El Salvador to your door...  ',
  'bitdriver.taxi': 'Sorry, this product is unavailable. Please choose a different combination.  ',
  'beefbackbetter.com': 'Discover our sin additivo, GMO-free, regenerative agriculture practices in El Salvador. Taste the...  ',
  'app.marketandmorecr.com': 'Bitcoin accepting website',
  'campoapicola.com': 'Miel de abejas 100 % natural, polen, y propóleo directamente de nuestros apiarios en Santander, d...  ',
  'sweethomeparaguay.com': 'We provide services for expats, including a Paraguay mailbox with street address, mail scanning, ...  ',
  'inet.se': 'Just a moment... - Bitcoin accepting website',
  'kaffebox.no': 'Kaffeabonnement med den beste kaffen fra Skandinavias topp mikrobrennerier. Velg hvor mye kaffe d...  ',
  'bitcoinbonden.no': 'Velkommmen til gårdsbutikken på Øvre Lier! Har kan du kjøpe kjøtt og ved med Bitcoin.',
  'greatnorthairambulance.co.uk': 'We are now accepting Bitcoin as a form of payment from those who choose to donate to our life-sav...',
  'bonjourwines.co.uk': 'Sorry, this product is unavailable. Please choose a different combination.  ',
  'leedsgin.com': 'Leeds Gin Leeds Gin - Premium gin hand crafted in small batches A beautiful selection of gins bro...  ',
  'castlehillgin.com': 'BORN AND BRED IN YORKSHIRE With over 4000 years of history theres plenty to discover about ...  ',
  'spyequipmentuk.co.uk': 'Welcome to Spy Equipment UK. The Ultimate Spy Shop. Surveillance Equipment, Spy Cameras, Listenin...  ',
  'purpleheartstudios.co.uk': 'Luxury residential recording and podcast studio in Surrey.  ',
  'motrhome.com': 'Motrhome.com are motorhome and camper specialists. From electrical accessories, servicing & o...  ',
  'pumphreys-coffee.co.uk': 'Partner with Pumphreys Coffee Distributors for premium quality coffee beans and products. Offerin...  ',
  'missprint.co.uk': 'Buy now from a family business producing striking modern wallpaper designs, fabrics and accessori...  ',
  'lightningbazaar.com': '100% Pure, Raw, Australian honey direct from the beekeeper to you.  ',
  'orangepages.nz': 'Market - Orange Pages - The bitcoin marketplace - OrangePages.nz - Bitcoin accepting website',
  'lightningbase.jp': 'Lightning Base は、ビットコイン関連商品がライトニング決済と匿名配送で買えるオンラインショップです。ハードウェアウォレットをはじめ、オリジナルグッズやアパレルなど、ここでしか買えな...  ',
  'chavda.com': 'You don\'t have permission to access this resource.  ',
  'bramleigh.co.za': 'Bitcoin Accepted Here',
  'stk.co.za': 'Sorry, this product is unavailable. Please choose a different combination.  ',
  'butlers.co.za': 'Butler  ',
  'ticketpro.co.za': 'Bitcoin accepting website',
  'dailymaverick.co.za': 'Daily Maverick is a leading South African source of news, opinion and investigations.  ',
  'geewiz.co.za': 'Just a moment... - Bitcoin accepting website',
  'lightingwarehouse.co.za': 'Bitcoin accepting website',
  'skoonskin.com': 'Discover SKOON. Customisable, Non-Toxic Skincare Infused with African Beauty Wisdom. Inclusive, S...  ',
  'wizmed.co.za': 'Shop at WiZmed for Littmann stethoscopes and the best-value scrubs in Africa. Enjoy quick service...  ',
  'furniturespot.co.za': 'Furniture made in South Africa from durable, premium materials. With our online-first policy, we ...  ',
  'epicdeals.co.za': 'SA’s trusted online retailer of pre-loved technology. Free shipping on all orders across SA. Prio...  ',
  'flook.co.za': 'Just a moment... - Bitcoin accepting website',
  'columbiasportswear.co.za': 'Discover high-performance sportswear at Columbia. Elevate your outdoor adventures with our premiu...  ',
  'brights.co.za': 'Brights Hardware Store is a multi-faceted outlet for all one’s building material & hardware n...  ',
  'btgames.co.za': 'BT Games is the South Africas leading games retailer with great deals on video games, conso...  ',
  'bootlegger.coffee': 'Bootlegger Coffee Company was created in 2012 by 3 best friends, Pieter Bloem, De Waal Basson ...  ',
  'brutech.co.za': 'Brutech is South Africa’s trusted high-performance custom PC builder. Premium prebuilt PCs, upgra...  ',
  'lugtolug.co.za': 'Bitcoin accepting website',
  'thebabyempireltd.co.za': 'Baby and Toddler Clothing and Accessories  ',
  'getdu.ae': 'GetDu is here to help you acquire the best Du internet connection packages in a smooth hass...  ',
  'namecheap.com': 'Just a moment... - Bitcoin accepting website',
  'twentyonesolutions.com': 'TwentyOne Solutions is the best website designer for small business in San Clemente. Free website...  ',
  'fmphost.com': 'Fully managed FileMaker hosting keeps your databases safely in the cloud providing FileMaker Pro ...  ',
  'mega.io': 'Secure and private cloud storage for everyone. Store and share files, chat, meet, back up, sync, ...  ',
  'mynymbox.io': 'Anonymous hosting solutions, domain registrations and dns parking. No personal data needed. Pay w...  ',
  'racknation.cr': 'DataCenter in Costa Rica with two locations in San José, CR1 San Pedro & CR2 Curridabat, Ra...  ',
  'sovransystems.com': 'Sovereign Computing - Run Your Own Bitcoin Node, BTCPayserver, Matrix Chat, Nextcloud, and Wordpr...',
  'lunanode.com': 'LunaNode: Cloud Virtualization Platform - Bitcoin accepting website',
  'dynadot.com': 'Register domains at low prices with Dynadot! Get free privacy, 24/7 support & powerful tools. Cho...  ',
  'planetexpress.com': 'Bitcoin accepting website',
  'satosphere21.com': 'The Satosphere is a rotating bitcoin globe designed to inspire, educate and spark curiosity for p...',
  'blockhuntersgame.com': 'Blockhunters is a fast-paced Bitcoin board game of strategy and competition. Stack sats, outsmart...',
  'geyser.fund': 'A Bitcoin crowdfunding platform where creators raise funds for causes, sell products, manage camp...',
  'izindlovu.org': 'Izindlovu Fund is a Belgian non-profit organisation dedicated to supporting local field projects ...  ',
  'cypherflow.ai': 'Bitcoin accepting website',
  'sats.coffee': 'Our beans are high-quality and are purchased using bitcoin on the Lightning Network or on-chain. ...',
  'lightningkoffee.com': 'Colombian coffee, with a shopping experience in Bitcoin Lightning Network',
  'mobimatter.com': 'Buy travel eSIMs from MobiMatter for 200+ destinations. Enjoy instant eSIM delivery and seamless ...  ',
  'silent.link': 'Experience borderless connectivity in 160+ countries with no KYC, data limits, or expirations - j...  ',
  'obscura.net': 'Available for Mac. Download today.  ',
  'mullvad.net': 'Free the internet from mass surveillance and censorship. Fight for privacy with Mullvad VPN and M...  ',
  'joltfun.com': 'Buy games with Bitcoin/Lightning for Steam, Battle.net, Bethesda, Epic Store, Origin, GOG.com, Pl...',
  'g2a.com': ' ',
  'travala.com': 'Bitcoin accepting website',
  'airbtc.online': 'Choose one of the available destinations and spend your dream vacation in one of the most attract...  ',
  'bitcointravel.com': 'Book your travel with exclusive Bitcoin payments using our web3 platform services. Find your flig...',
  'honey.hivetalk.org': 'HiveTalk Honey - Nostr + Lightning Enabled Video Conferencing  ',
};

/**
 * Get website description by URL
 * @param url The website URL
 * @returns The description or null if not found
 */
export function getWebsiteDescription(url: string): string | null {
  // Extract domain from URL
  try {
    // Remove protocol and www
    let domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
    // Remove path
    domain = domain.split('/')[0].toLowerCase();
    
    return websiteDescriptions[domain] || null;
  } catch (error) {
    console.error('Error extracting domain:', error);
    return null;
  }
}

// We're using a static mapping approach instead of fetching metadata dynamically
