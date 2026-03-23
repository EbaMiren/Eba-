export interface Topic {
  id: string;
  title: string;
  description: string;
  points: string[];
  vocabulary: string[];
  usefulPhrases: string[];
  level: 'B2';
  category: string;
}

export const TOPICS: Topic[] = [
  {
    id: '1',
    title: 'Teknologia eta Gazteak',
    description: 'Gazteek teknologiarekin duten harremanari buruzko hausnarketa sakona.',
    points: [
      'Sare sozialen erabilera eta mendekotasun arriskuak.',
      'Teknologiaren abantailak ikasketetan eta informazio iturri gisa.',
      'Pribatutasuna eta segurtasuna interneten: nola babestu gure datuak.',
      'Harreman sozialen eraldaketa: pantailak vs aurrez aurrekoak.'
    ],
    vocabulary: ['Mendekotasuna', 'Pribatutasuna', 'Sare sozialak', 'Segurtasuna', 'Hausnarketa', 'Eragina', 'Datu pertsonalak', 'Ziberbullying-a', 'Isolamendua', 'Gailu elektronikoak', 'Sarean murgildu', 'Iruzurra'],
    usefulPhrases: [
      'Gaur egun, ezinbestekoa bihurtu da teknologiaren erabilera egokia sustatzea.',
      'Alde batetik abantailak dituen arren, bestetik arriskuak ez dira nolanahikoak.',
      'Gazteen artean joera kezkagarria ikusten da pantailen aurrean ematen duten denborari dagokionez.',
      'Nire ustez, hezkuntza da gakoa segurtasuna bermatzeko eta erabilera arduratsua bultzatzeko.',
      'Ez dugu ahaztu behar teknologia tresna bat dela, ez helburu bat.'
    ],
    level: 'B2',
    category: 'Gizartea'
  },
  {
    id: '6',
    title: 'Sare Sozialak eta Bakardadea',
    description: 'Sare sozialek gure harremanetan eta isolamenduan duten eragina.',
    points: [
      'Bakardade sentimendua mundu hiperkonektatu batean.',
      'Sare sozialak eta autoestimua: irudi perfektuaren presioa.',
      'Harreman digitalak vs aurrez aurrekoak: sakontasun falta?',
      'Bakardadea arintzeko tresna ala isolamendurako bidea?'
    ],
    vocabulary: ['Bakardadea', 'Hiperkonektatua', 'Autoestimua', 'Harremanak', 'Digitala', 'Isolamendua', 'Itxura', 'Azaleko harremanak', 'Onarpena', 'Frustrazioa', 'Konparaketa', 'Gizarte-bazterkeria'],
    usefulPhrases: [
      'Paradoxikoa dirudien arren, zenbat eta konektatuago egon, orduan eta isolatuago sentitzen gara askotan.',
      'Askotan, sareetan erakusten duguna ez da errealitatea, baizik eta irudi idealizatu bat.',
      'Bakardadea sentitzea ez da gauza bera bakarrik egotea baino; barne-hustasuna da arazoa.',
      'Garrantzitsua da oreka aurkitzea mundu birtualaren eta errealaren artean, giza harremanak lehenetsiz.',
      'Sare sozialek onarpen premia artifiziala sortzen dute guregan.'
    ],
    level: 'B2',
    category: 'Gizartea'
  },
  {
    id: '2',
    title: 'Ingurumena eta Birziklapena',
    description: 'Gure herriko kutsadura, hondakinen kudeaketa eta jasangarritasuna.',
    points: [
      'Plastikoen erabilera murrizteko neurri eraginkorrak.',
      'Garraio publikoaren eta mugikortasun jasangarriaren garrantzia.',
      'Banakoaren erantzukizuna klima-aldaketan: keinu txikien indarra.',
      'Ekonomia zirkularra: berrerabili eta konpondu.'
    ],
    vocabulary: ['Kutsadura', 'Hondakinak', 'Birziklapena', 'Klima-aldaketa', 'Erantzukizuna', 'Jasangarritasuna', 'Berotegi-efektua', 'Biodibertsitatea', 'Ekosistema', 'Kontsumo arduratsua', 'Baliabide naturalak', 'Isurketak'],
    usefulPhrases: [
      'Gure planetaren egoera larria dela eta, ezin dugu beste alde batera begiratu.',
      'Beharrezkoa da kontsumo ohiturak goitik behera aldatzea jasangarritasuna lortzeko.',
      'Gobernuek neurri zorrotzagoak hartu beharko lituzkete enpresen isurketak kontrolatzeko.',
      'Etorkizuneko belaunaldiei utziko diegun ondarea jokoan dago, eta orain da ekiteko unea.',
      'Keinu txikiek, metatuz gero, aldaketa handiak eragin ditzakete.'
    ],
    level: 'B2',
    category: 'Ingurumena'
  },
  {
    id: '7',
    title: 'Energia Berriztagarriak',
    description: 'Energia garbien garrantzia eta trantsizio energetikoa.',
    points: [
      'Eguzki-energia eta eolikoa etxeetan: autokontsumoa.',
      'Energia aurrezteko ohiturak eguneroko bizitzan.',
      'Gobernuen papera eta inbertsioak trantsizio energetikoan.',
      'Energia fosilen amaiera: erronkak eta aukerak.'
    ],
    vocabulary: ['Berriztagarriak', 'Trantsizioa', 'Aurreztea', 'Eolikoa', 'Eguzki-energia', 'Autokontsumoa', 'Fosila', 'Eraginkortasun energetikoa', 'Panel fotovoltaikoak', 'Mendekotasuna', 'Berotzea', 'Inbertsioa'],
    usefulPhrases: [
      'Energia garbien aldeko apustua egitea premiazkoa da klima-aldaketari aurre egiteko.',
      'Epe luzera, inbertsio hauek errentagarriak dira, bai ekonomikoki bai ekologikoki.',
      'Mendekotasun energetikoa murrizteko bidea energia berriztagarrien hedapena da.',
      'Gizarte osoaren inplikazioa beharrezkoa da trantsizio energetiko hau gauzatzeko.',
      'Energia aurreztea da produzi daitekeen energiarik garbienera hurbiltzeko modua.'
    ],
    level: 'B2',
    category: 'Ingurumena'
  },
  {
    id: '3',
    title: 'Lan-mundua eta Telelana',
    description: 'Lan egiteko modu berriak, kontziliazioa eta digitalizazioa.',
    points: [
      'Telelanaren alde onak eta txarrak: isolamendua vs erosotasuna.',
      'Lanaren eta bizitza pertsonalaren arteko oreka (kontziliazioa).',
      'Lan-elkarrizketa bat prestatzeko estrategiak mundu digitalean.',
      'Lanaldi laburragoaren eztabaida: produktibitatea hobetzeko bidea?'
    ],
    vocabulary: ['Telelana', 'Oreka', 'Lan-elkarrizketa', 'Estrategiak', 'Abantailak', 'Kontziliazioa', 'Produktibitatea', 'Lan-merkatua', 'Deskonexio digitala', 'Lanaldi malgua', 'Etekinak', 'Lan-giroa'],
    usefulPhrases: [
      'Pandemiak lan egiteko modua goitik behera aldatu du, telelana normalizatuz.',
      'Nire ustez, eredu hibridoa da egokiena, presentzialtasuna eta urrutiko lana uztartuz.',
      'Ezinbestekoa da deskonexio digitalerako eskubidea bermatzea langileen osasunerako.',
      'Lan-bizitza eta bizitza pribatua bereiztea zaila gertatzen da etxean lan egiten denean.',
      'Produktibitatea ez dago lotuta bulegoan ematen diren ordu kopuruarekin.'
    ],
    level: 'B2',
    category: 'Lana'
  },
  {
    id: '8',
    title: 'Langabezia eta Gazteak',
    description: 'Gazteen egoera prekarioa lan-merkatuan eta etorkizuneko kezkak.',
    points: [
      'Prekarietatea, soldata baxuak and lehen lan-aukera.',
      'Formakuntzaren garrantzia eta "titulitis"-aren arazoa.',
      'Atzerrira joateko beharra (fuga de cerebros) lana aurkitzeko.',
      'Ekintzailetza gazteen artean: arriskua ala aukera?'
    ],
    vocabulary: ['Langabezia', 'Prekarietatea', 'Formakuntza', 'Lan-merkatua', 'Aukera', 'Ekintzailetza', 'Emantzipazioa', 'Egonkortasuna', 'Bekaduna', 'Soldata', 'Gaitasunak', 'Mugikortasuna'],
    usefulPhrases: [
      'Gazte askok ikasketa maila altua izan arren, ezin dute beren prestakuntzako lanik aurkitu.',
      'Egoera honek emantzipazioa atzeratzea dakar, gazteen bizi-proiektuak kaltetuz.',
      'Esperientzia falta da askotan oztoporik handiena lehen lan-aukera lortzeko orduan.',
      'Beharrezkoa da gazteentzako politika aktiboak sustatzea lan-merkatuan sartzea errazteko.',
      'Atzerrira joatea aukera bat izan beharko litzateke, ez ezinbesteko beharra.'
    ],
    level: 'B2',
    category: 'Lana'
  },
  {
    id: '4',
    title: 'Osasuna eta Kirola',
    description: 'Bizimodu osasuntsua, elikadura eta osasun mentala.',
    points: [
      'Elikadura orekatuaren garrantzia gizarte azkar honetan.',
      'Kirolak osasun mentalean duen eragina: estresa eta antsietatea.',
      'Sedentarismoari aurre egiteko estrategiak lanpostuetan.',
      'Kirol profesionalaren itzala: dopina eta presioa.'
    ],
    vocabulary: ['Elikadura', 'Osasun mentala', 'Sedentarismoa', 'Ohiturak', 'Orekatu', 'Estresa', 'Antsietatea', 'Prebentzioa', 'Ongizatea', 'Ariketa fisikoa', 'Nutrizioa', 'Bizi-itxaropena'],
    usefulPhrases: [
      'Osasuna ez da soilik gaixotasunik ez izatea, ongizate osoa baizik.',
      'Kirola egitea ezinbestekoa da oreka emozionala eta fisikoa mantentzeko.',
      'Askotan, denbora falta aitzakia gisa erabiltzen dugu ariketa fisikoa alde batera uzteko.',
      'Prebentzioa da botikarik onena epe luzera osasun arazoak saihesteko.',
      'Garrantzitsua da elikadura kontzientea sustatzea txikitatik.'
    ],
    level: 'B2',
    category: 'Osasuna'
  },
  {
    id: '9',
    title: 'Osasun Mentala eta Gizartea',
    description: 'Osasun mentalaren tabuak eta garrantzia gaur egun.',
    points: [
      'Estigma soziala eta laguntza eskatzeko beldurra.',
      'Sare sozialen eragina antsietate mailan.',
      'Lan-estresa eta "burnout" sindromea.',
      'Osasun sistema publikoaren erronkak arlo honetan.'
    ],
    vocabulary: ['Estigma', 'Laguntza', 'Tabua', 'Burnout', 'Psikologoa', 'Emozioak', 'Ongizatea', 'Presioa', 'Depresioa', 'Autoestima', 'Enpatia', 'Prebentzioa'],
    usefulPhrases: [
      'Gai honen inguruko tabuak apurtzeko garaia da, osasun mentala normalizatuz.',
      'Osasun mentala osasun fisikoa bezain garrantzitsua da gure bizi-kalitaterako.',
      'Gizarteak eta lan-munduak presio handia eragiten dute gure osasun emozionalean.',
      'Laguntza profesionala eskatzea indar zeinu bat da, autozaintzaren erakusgarri.',
      'Beharrezkoa da baliabide gehiago bideratzea osasun mentaleko zerbitzu publikoetara.'
    ],
    level: 'B2',
    category: 'Osasuna'
  },
  {
    id: '5',
    title: 'Euskara eta Kultura',
    description: 'Euskararen erabilera, sustapena eta euskal kultura gaur egun.',
    points: [
      'Euskararen erabilera lagunartean eta eremu informaletan.',
      'Euskal kulturaren sustapena gazteen artean: musika, zinema...',
      'Hizkuntza-eskakizunen garrantzia eta eztabaida lan-munduan.',
      'Euskara mundu digitalean: aplikazioak, eduki-sortzaileak...'
    ],
    vocabulary: ['Sustapena', 'Hizkuntza-eskakizuna', 'Kultur ekitaldiak', 'Egoera', 'Erabilera', 'Ezagutza', 'Motibazioa', 'Eremu informala', 'Normalizazioa', 'Aisialdia', 'Nortasuna', 'Transmisioa'],
    usefulPhrases: [
      'Ezagutzak gora egin duen arren, erabilerak geldirik jarraitzen duela dirudi.',
      'Garrantzitsua da euskara aisialdiarekin eta emozio positiboekin lotzea.',
      'Hizkuntza bat ez da galtzen ez dakitenek ikasten ez dutelako, dakitenek hitz egiten ez dutelako baizik.',
      'Kulturak herri baten nortasuna definitzen du eta euskarak bizirik mantentzen du.',
      'Euskarak mundu digitalera egokitu behar du bizirik iraun nahi badu.'
    ],
    level: 'B2',
    category: 'Kultura'
  },
  {
    id: '10',
    title: 'Turismoa eta Jasangarritasuna',
    description: 'Turismo masiboaren eragina eta alternatiba jasangarriak.',
    points: [
      'Turismo masiboaren ondorioak hirietan (gentrifikazioa).',
      'Turismo jasangarria: ingurumena eta tokiko kultura errespetatzea.',
      'Euskadi helburu turistiko gisa: abantailak eta arriskuak.',
      'Bidaiatzeko modu berriak: "slow travel" eta hurbileko turismoa.'
    ],
    vocabulary: ['Gentrifikazioa', 'Masifikazioa', 'Jasangarria', 'Tokiko kultura', 'Ondarea', 'Eragina', 'Eskaintza', 'Eskaria', 'Erosahalmena', 'Kutsadura', 'Bizi-kalitatea', 'Erakargarritasuna'],
    usefulPhrases: [
      'Turismoa diru iturri garrantzitsua da, baina baita arazo iturri ere kudeaketa txarra bada.',
      'Beharrezkoa da turismo eredua birpentsatzea, jasangarritasuna ardatz hartuta.',
      'Tokiko bizilagunen bizi-kalitatea bermatu behar da turismoaren hazkundearen aurretik.',
      'Bidaiatzea ez da soilik lekuak ikustea, tokiko kulturan murgiltzea eta errespetatzea baizik.',
      'Turismo masiboak hirien nortasuna galtzea dakar askotan.'
    ],
    level: 'B2',
    category: 'Kultura'
  },
  {
    id: '11',
    title: 'Hezkuntza eta Etorkizuna',
    description: 'Hezkuntza sistemaren erronkak eta teknologia berriak gelan.',
    points: [
      'Adimen artifiziala hezkuntzan: laguntza ala mehatxua?',
      'Gaitasun digitalak vs eduki memoristikoak.',
      'Hezkuntza inklusiboa eta aukera berdintasuna.',
      'Etengabeko ikaskuntza (lifelong learning) gaur egungo munduan.'
    ],
    vocabulary: ['Inklusiboa', 'Adimen artifiziala', 'Gaitasuna', 'Berdintasuna', 'Metodologia', 'Berrikuntza', 'Ebaluazioa', 'Motibazioa', 'Curriculuma', 'Irakaskuntza', 'Ikaskuntza', 'Baliabideak'],
    usefulPhrases: [
      'Eskolak gizartearen aldaketa azkarretara egokitu behar du atzean ez geratzeko.',
      'Irakaslearen papera aldatzen ari da: informazio emaile izatetik gidari izatera.',
      'Ikasten ikastea da gaur egun ikasleek lortu behar duten gaitasunik garrantzitsuena.',
      'Hezkuntza da etorkizuneko gizarte bidezkoago bat eraikitzeko tresna nagusia.',
      'Teknologia hezkuntzaren zerbitzura egon behar da, ez alderantziz.'
    ],
    level: 'B2',
    category: 'Hezkuntza'
  },
  {
    id: '12',
    title: 'Kontsumismoa eta Publizitatea',
    description: 'Gure kontsumo ohiturak eta publizitatearen eragina.',
    points: [
      'Erosi, erabili eta bota: kontsumo arduragabearen ondorioak.',
      'Publizitatearen manipulazioa eta behar artifizialak.',
      'Kontsumo arduratsua eta tokiko merkataritza.',
      'Minimalismoa: gutxiagorekin hobeto bizi al gaiteke?'
    ],
    vocabulary: ['Kontsumismoa', 'Publizitatea', 'Ardura', 'Manipulazioa', 'Beharra', 'Minimalismoa', 'Tokiko merkataritza', 'Hondakinak', 'Zoriontasuna', 'Erosketak', 'Marketing-a', 'Eragina'],
    usefulPhrases: [
      'Gizarte honek etengabe kontsumitzera bultzatzen gaitu zoriontasuna lortzeko bide gisa.',
      'Askotan, ez dugu behar duguna erosten, publizitateak nahi dugula sinetsarazten diguna baizik.',
      'Publizitateak zoriontasun faltsu eta iheskor bat saltzen digu egunero.',
      'Kontsumo arduratsua mundua aldatzeko eta ingurumena babesteko indar handia du.',
      'Minimalismoak bizitza erraztea eta benetan garrantzitsua dena baloratzea proposatzen du.'
    ],
    level: 'B2',
    category: 'Kontsumoa'
  },
  {
    id: '13',
    title: 'Etxebizitzaren Arazoa',
    description: 'Gazteen emantzipazioa eta alokairuaren prezio altuak.',
    points: [
      'Alokairuaren garestitzea hiri handietan.',
      'Gazteen emantzipazio berantiarra eta ondorioak.',
      'Etxebizitza turistikoen eragina auzoetan.',
      'Gobernuen neurriak: alokairu mugatuak eta laguntzak.'
    ],
    vocabulary: ['Alokairua', 'Emantzipazioa', 'Garestitzea', 'Eskuragarritasuna', 'Hipoteka', 'Etxebizitza turistikoa', 'Auzoa', 'Laguntza', 'Eskubidea', 'Prezioa', 'Eskaintza', 'Eskaria'],
    usefulPhrases: [
      'Etxebizitza eskubide bat izatetik negozio-objektu izatera igaro da gure gizartean.',
      'Gazte askok ezin dute beren bizitza proiektu independentea hasi etxebizitza faltagatik.',
      'Prezioak neurrigabe igo dira azken urteotan, soldaten igoeraren oso gainetik.',
      'Beharrezkoa da etxebizitza politika publiko indartsua eta ausarta espekulazioari aurre egiteko.',
      'Etxebizitza turistikoek auzoetako bizitza tradizionala suntsitzen ari dira.'
    ],
    level: 'B2',
    category: 'Gizartea'
  },
  {
    id: '14',
    title: 'Moda Azkarra (Fast Fashion)',
    description: 'Arropa kontsumo masiboa eta bere ondorioak.',
    points: [
      'Moda azkarraren ingurumen-inpaktua (ura, kutsadura).',
      'Lan-baldintzak ehungintza industrian hirugarren munduan.',
      'Bigarren eskuko arroparen moda: alternatiba jasangarria?',
      'Kalitatea vs kantitatea: nola erosten dugu?'
    ],
    vocabulary: ['Ehungintza', 'Jasangarritasuna', 'Inpaktua', 'Lan-baldintzak', 'Bigarren eskua', 'Kontsumismoa', 'Hondakinak', 'Kalitatea', 'Ekoizpena', 'Kutsadura', 'Erosketak', 'Etika'],
    usefulPhrases: [
      'Arropa merkeak kostu handia du planetarentzat eta langileen eskubideentzat.',
      'Erosi, erabili eta bota eredua aldatu behar dugu jasangarritasunaren mesedetan.',
      'Garrantzitsua da arroparen jatorria eta ekoizpen baldintzak ezagutzea erosi aurretik.',
      'Gutxiago eta hobeto erostea da gakoa moda jasangarriagoa lortzeko.',
      'Bigarren eskuko merkatuak indarra hartu du kontsumo arduratsuaren barruan.'
    ],
    level: 'B2',
    category: 'Kontsumoa'
  },
  {
    id: '15',
    title: 'Deskonexio Digitala',
    description: 'Pantailen aurrean ematen dugun denbora eta deskonektatzeko beharra.',
    points: [
      'Laneko mezuak lanorduz kanpo: deskonexio eskubidea.',
      'Pantailen eragina loaren kalitatean eta kontzentrazioan.',
      'Oporrak teknologiarik gabe: "detox" digitala.',
      'Nola kudeatu jakinarazpenak eta sare sozialen erabilera.'
    ],
    vocabulary: ['Deskonexioa', 'Jakinarazpena', 'Kontzentrazioa', 'Loaren kalitatea', 'Bikaintasuna', 'Mendekotasuna', 'Eskubidea', 'Egoera', 'Estresa', 'Osasun mentala', 'Pantailak', 'Muga'],
    usefulPhrases: [
      'Beti konektatuta egoteak estresa eta antsietatea sortzen digu etengabe.',
      'Lanaren eta bizitza pertsonalaren arteko muga lausotu egin da teknologiaren erruz.',
      'Deskonexio digitala osasun mentalerako eta atsedenerako ezinbesteko eskubidea da.',
      'Garrantzitsua da pantailarik gabeko tarteak gordetzea gure bizitzan, batez ere lo egin aurretik.',
      'Detox digitala egitea beharrezkoa da gure burua berreskuratzeko.'
    ],
    level: 'B2',
    category: 'Osasuna'
  },
  {
    id: '16',
    title: 'Animalien Eskubideak',
    description: 'Animalien jabetza arduratsua eta lege berriak.',
    points: [
      'Animaliak familiaren parte gisa: jabetza arduratsua.',
      'Abandonuaren aurkako neurriak eta adopzioaren garrantzia.',
      'Animalien ongizatea vs tradizioak edo ikuskizunak.',
      'Hiriak animalientzako egokituta daude?'
    ],
    vocabulary: ['Ongizatea', 'Adopzioa', 'Abandonua', 'Jabetza arduratsua', 'Eskubideak', 'Legea', 'Ikuskizuna', 'Egokituta', 'Babesa', 'Sentiberatasuna', 'Erantzukizuna', 'Zaintza'],
    usefulPhrases: [
      'Animaliak ez dira gauzak, sentimenduak dituzten izakiak baizik, eta horrela tratatu behar ditugu.',
      'Adopzioak bizitza bat salbatzea dakar eta abandonuaren aurkako borrokarik onena da.',
      'Lege berriek babes handiagoa ematen diete animaliei, baina gizartearen kontzientziazioa falta da.',
      'Gizarte baten garapena animaliak nola tratatzen dituen ikusita neurtu daiteke.',
      'Animalien ongizatea tradizioen gainetik egon beharko litzateke beti.'
    ],
    level: 'B2',
    category: 'Gizartea'
  }
];

export const CONNECTORS = [
  { category: 'Hasiera', phrases: ['Hasteko...', 'Lehenik eta behin...', 'Gai honi helduz...'] },
  { category: 'Iritzia emateko', phrases: ['Nire ustez...', 'Nire iritziz...', 'Nire puntutik ikusita...', 'Argi dago...'] },
  { category: 'Adostasuna', phrases: ['Bat nator horrekin.', 'Arrazoi duzu.', 'Ados nago zurekin.'] },
  { category: 'Desadostasuna', phrases: ['Ez nago ados.', 'Ez dut uste horrela denik.', 'Kontrako iritzia dut.'] },
  { category: 'Ondorioak', phrases: ['Amaitzeko...', 'Ondorioz...', 'Laburbilduz...', 'Hori dela eta...'] }
];
