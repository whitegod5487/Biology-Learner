// notes.en.js
// Biology Revision App — topic notes (bullet-point style) + two long questions (with model answers)
// English (UK) version — matches notes.js (zh-HK); loaded when the app language is English (UK).
// Topic numbers match topics.js (1–37)
// Data structure:
//   { no, name,
//     sections: [ { heading, points: [ ... ] } ],
//     longQuestions: [ { q, marks, answer } ] }

const NOTES_EN = [
  {
    no: 1,
    name: "Introduction to Biology",
    sections: [
      {
        heading: "Characteristics of living organisms",
        points: [
          "All living organisms share the following life characteristics: nutrition (feeding), respiration, excretion, response to stimuli (irritability), movement, growth and reproduction.",
          "Living organisms need energy to maintain life; energy mainly comes from respiration, which breaks down food.",
          "Excretion is the removal of waste products produced by cell metabolism; egestion is the removal of undigested food residues — the two are different.",
          "Example of irritability: leaves of the sensitive plant (Mimosa) close when touched."
        ]
      },
      {
        heading: "Scientific method",
        points: [
          "Steps of scientific investigation: observation → asking questions → making a hypothesis → designing an experiment → carrying out the experiment and collecting data → analysing data → drawing conclusions.",
          "Controlled experiment: apart from the independent variable, all other conditions of the control group and the experimental group should be kept the same to eliminate the effect of other variables.",
          "The independent variable is the factor that is deliberately changed; the dependent variable is the result that changes and is measured.",
          "Repeating experiments and using multiple samples improves the reliability of results.",
          "Scientific attitude: be objective, honest, modify original ideas based on evidence, and record all observations."
        ]
      },
      {
        heading: "Microscopes",
        points: [
          "Total magnification = magnification of eyepiece × magnification of objective lens.",
          "The image under a light microscope is inverted both vertically and horizontally (inverted image).",
          "Use the low-power objective first to locate the specimen, then switch to the high-power objective.",
          "Cell size is commonly measured in micrometres (μm); 1 mm = 1000 μm."
        ]
      },
      {
        heading: "Classification of organisms and food tests",
        points: [
          "Hierarchy of classification from largest to smallest: kingdom → phylum → class → order → family → genus → species; the species is the smallest classification unit.",
          "Binomial nomenclature: the scientific name consists of the genus name plus the species name.",
          "Five-kingdom system: Prokaryotae (Monera), Protista, Fungi, Plantae and Animalia (viruses do not belong to any kingdom).",
          "Food tests: iodine solution tests for starch (turns blue-black); Benedict's solution tests for reducing sugar (brick-red precipitate); biuret test tests for protein (purple); grease-spot test tests for lipids (permanent translucent spot)."
        ]
      }
    ],
    longQuestions: [
      {
        q: "A student wants to investigate whether temperature affects the activity of a certain enzyme. State the independent variable, the dependent variable, and one variable that needs to be controlled in this experiment.",
        marks: "3 marks",
        answer: "Independent variable: temperature.\nDependent variable: enzyme activity / rate of reaction (e.g. amount of product).\nVariable to be controlled: pH, enzyme concentration, substrate concentration, reaction time, etc. (any one)."
      },
      {
        q: "Explain the difference between 'excretion' and 'egestion', and give one example of each.",
        marks: "4 marks",
        answer: "Excretion is the removal of waste products produced by cell metabolism, e.g. removing carbon dioxide and urea (in urine).\nEgestion is the removal of undigested food residues from the alimentary canal, e.g. faeces.\nBoth involve removing substances, but their sources differ (metabolic waste vs undigested residues)."
      }
    ]
  },
  {
    no: 2,
    name: "Molecules of Life",
    sections: [
      {
        heading: "Functions of water",
        points: [
          "Water acts as a coolant — when we sweat, the evaporation of sweat removes heat from the body surface.",
          "Water helps regulate body temperature — water has a high specific heat capacity, so it takes in more heat energy to rise by one degree.",
          "Water is a good solvent and is the medium required for chemical reactions.",
          "Water is a transport medium (the medium for transporting substances in the blood).",
          "Water can act as a reactant, e.g. in photosynthesis."
        ]
      },
      {
        heading: "Functions of fats (lipids)",
        points: [
          "Examples of lipids: triglycerides (fats and oils), phospholipids and steroids.",
          "Energy store — plants store them in seeds, animals store them in adipose tissue.",
          "Subcutaneous fat acts as an insulator, reducing heat loss.",
          "Fat surrounding the internal organs absorbs shock and protects vital organs.",
          "Cholesterol is the raw material for steroid hormones, vitamin D and bile salts.",
          "Phospholipids are major components of the cell membrane."
        ]
      },
      {
        heading: "Functions of proteins",
        points: [
          "Build body structures (muscles, skin, hair).",
          "Form parts of cells (cell membrane, cytoplasm).",
          "Support the growth and repair of cells and tissues.",
          "Form enzymes and hormones (e.g. insulin), controlling metabolism.",
          "Form antibodies to fight against pathogens.",
          "When carbohydrates and fats are insufficient, proteins can be broken down to release energy."
        ]
      },
      {
        heading: "Carbohydrates and nucleic acids",
        points: [
          "Monosaccharides: glucose, fructose, galactose; glucose releases energy through respiration.",
          "Disaccharides: maltose, sucrose (a non-reducing sugar), lactose.",
          "Polysaccharides: starch (plant store), glycogen (animal store in liver and muscles), cellulose (main component of plant cell walls).",
          "A nucleotide consists of a pentose sugar, a nitrogenous base and a phosphate group; nucleic acids include DNA (deoxyribonucleic acid) and RNA (ribonucleic acid).",
          "Nucleic acids are very important for heredity and protein synthesis."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Describe the similar functions and different functions of proteins and lipids in living organisms, and explain why they are suitable for performing these functions. (Condensed from 2002 AL Paper 2 Q7)",
        marks: "12 marks",
        answer: "Similar functions:\n(1) As an energy source — amino acids enter the Krebs cycle after deamination to produce ATP; triglycerides/fatty acids also enter the cycle to produce ATP, and fats have a higher hydrogen-to-oxygen ratio so they are more easily oxidised.\n(2) Growth — phospholipids and proteins are both components of cell membranes.\n(3) Regulation — steroid hormones (e.g. oestrogen) and protein hormones (e.g. insulin) can both act as hormones.\n(4) Protection — adipose tissue protects internal organs; keratin and the stratum corneum have protective roles.\nDifferent functions:\nUnique to proteins: act as enzymes to catalyse reactions, act as antibodies for defence, haemoglobin transports oxygen, fibrinogen helps blood clotting, and they form chromosomes.\nUnique to lipids: act as solvents for fat-soluble vitamins, act as an insulating layer to maintain body temperature, and myelin sheaths speed up transmission of nerve impulses."
      },
      {
        q: "A food sample is tested in turn with iodine solution, Benedict's solution, biuret reagent and the grease-spot test. The results are blue-black, a brick-red precipitate, purple, and a permanent translucent spot respectively. Deduce the food substances present in the sample, and state one positive result for each food test.",
        marks: "5 marks",
        answer: "Iodine solution turning blue-black → contains starch.\nBenedict's solution giving a brick-red precipitate on heating → contains reducing sugar.\nBiuret reagent turning purple → contains protein.\nGrease-spot test leaving a permanent translucent spot → contains lipids.\nConclusion: the sample contains starch, reducing sugar, protein and lipids at the same time."
      }
    ]
  },
  {
    no: 3,
    name: "Cellular Organisation",
    sections: [
      {
        heading: "Microscopes and cell structure",
        points: [
          "Total magnification = eyepiece magnification × objective lens magnification; the image under a light microscope is inverted.",
          "The cell membrane controls the movement of substances in and out of the cell; the cytoplasm is the site where many chemical reactions take place.",
          "The nucleus stores genetic material (DNA) and controls cell activities.",
          "Ribosomes synthesise proteins; the Golgi apparatus modifies, packages and secretes proteins.",
          "Mitochondria carry out respiration to release energy; lysosomes contain digestive enzymes that break down waste or foreign substances."
        ]
      },
      {
        heading: "Plant cells and animal cells",
        points: [
          "Structures unique to plant cells: cell wall (mainly cellulose), chloroplasts, large central vacuole.",
          "Animal cells have no cell wall, so in a hypotonic solution they absorb water, swell and may even burst.",
          "The vacuole of a plant cell stores water and maintains cell turgidity."
        ]
      },
      {
        heading: "Prokaryotic cells and eukaryotic cells",
        points: [
          "Prokaryotic cells have no membrane-bound nucleus; the genetic material lies free in the cytoplasm and they are generally smaller (e.g. bacteria).",
          "Eukaryotic cells have a true nucleus (e.g. cells of animals, plants and fungi)."
        ]
      },
      {
        heading: "Levels of cellular organisation and differentiation",
        points: [
          "Levels of organisation from simple to complex: cell → tissue → organ → system → organism.",
          "A tissue is a group of similar cells; the largest organ of the human body is the skin.",
          "Cell differentiation is the specialisation of cells into different types to perform different functions."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Compare the structure and functions of mitochondria and chloroplasts.",
        marks: "6 marks",
        answer: "Similarities: both are organelles surrounded by a double membrane; the inner membrane of both is highly folded to increase surface area.\nDifferences (structure): the inner membrane of mitochondria is folded to form cristae; the inner membrane of chloroplasts forms flattened, stacked sac-like structures (thylakoids).\nDifferences (function): mitochondria carry out respiration to produce energy (ATP); chloroplasts carry out photosynthesis to make food."
      },
      {
        q: "Explain why iodine solution is usually added when observing plant cells (such as onion epidermis).",
        marks: "3 marks",
        answer: "Iodine solution stains structures such as the nucleus, making them more clearly visible for observation.\n(It can also be stated that iodine solution turns blue-black with starch, to show the presence of starch.)"
      }
    ]
  },
  {
    no: 4,
    name: "Movement of Substances across Cell Membrane",
    sections: [
      {
        heading: "Fluid mosaic model and properties of the cell membrane",
        points: [
          "The cell membrane is made of a phospholipid bilayer; phospholipid molecules can move freely sideways, giving the membrane fluidity.",
          "Hydrophobic (fatty) parts are arranged in the middle of the bilayer; hydrophilic (phosphate) parts are arranged on the inner and outer surfaces.",
          "Protein molecules are scattered among the phospholipid molecules and can act as carriers, channels, receptors or enzymes.",
          "The cell membrane is differentially (selectively) permeable, elastic, and strong enough to enclose all the cell contents."
        ]
      },
      {
        heading: "How different substances are transported",
        points: [
          "Polar molecules (e.g. glucose, amino acids, ions) are repelled by the phospholipid bilayer and need to be transported through channel/carrier proteins in the membrane.",
          "Non-polar molecules (e.g. fatty acids, vitamins A, D, E) dissolve in the phospholipid bilayer and diffuse across the membrane.",
          "Small non-polar molecules (e.g. oxygen, carbon dioxide) can diffuse freely through the phospholipid bilayer.",
          "Large molecules (with a diameter larger than the channel proteins) enter the cell by endocytosis (phagocytosis)."
        ]
      },
      {
        heading: "Comparison of diffusion, osmosis and active transport",
        points: [
          "Diffusion: particles move from a region of higher concentration to one of lower concentration, no energy required; simple diffusion needs no carrier protein, facilitated diffusion needs carrier proteins.",
          "Osmosis: water molecules move across a differentially permeable membrane from a region of higher water potential to one of lower water potential, no energy and no carrier proteins required.",
          "Active transport: transports substances against the concentration gradient (from low to high concentration), requiring energy (ATP) and carrier proteins, e.g. root cells taking in ions, the small intestine absorbing glucose and amino acids.",
          "Factors affecting the rate of diffusion: the larger the concentration gradient, the faster; the higher the temperature, the faster; the shorter the distance, the faster; the smaller the molecules, the faster."
        ]
      },
      {
        heading: "Solutions and cells",
        points: [
          "Hypertonic solution (lower water potential than the cytoplasm): net movement of water out of the cell — animal cells shrink; plant cells undergo plasmolysis and the plant wilts.",
          "Isotonic solution (same water potential as the cell): no net movement of water, shape and volume unchanged.",
          "Hypotonic solution (higher water potential than the cytoplasm): net movement of water into the cell — animal cells swell and may even burst; plant cells do not burst because of the cell wall, but become turgid and hard, providing support to the plant."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Fresh lettuce becomes soft after being soaked in concentrated salt water. Explain this phenomenon. (Concept from 2018 DSE 1B Q2)",
        marks: "4 marks",
        answer: "Concentrated salt water is a hypertonic solution whose water potential is lower than that of the cell contents of the lettuce cells.\nWater moves by osmosis out of the cell contents into the concentrated salt water (net movement).\nThe cells lose water, the vacuoles shrink, and the cytoplasm separates from the cell wall (plasmolysis).\nThe cells lose turgidity, so the lettuce becomes soft."
      },
      {
        q: "A student immerses potato cylinders in sucrose solutions of different concentrations and measures the change in mass after two hours. Explain why the mass of the cylinders increases at some concentrations and decreases at others, and how to find the water potential of the potato cells.",
        marks: "5 marks",
        answer: "In a low-concentration (hypotonic) solution, water enters the cells by osmosis, so the mass of the cylinders increases.\nIn a high-concentration (hypertonic) solution, water leaves the cells by osmosis, so the mass of the cylinders decreases.\nFind the concentration at which there is no change in mass; the water potential of that sucrose solution equals the water potential of the potato cells.\nAt that concentration there is no net movement of water, so the two water potentials are equal."
      }
    ]
  },
  {
    no: 5,
    name: "Metabolism and Enzymes",
    sections: [
      {
        heading: "Metabolism",
        points: [
          "Catabolism: breaking down complex molecules into simpler substances, usually releasing energy (e.g. breakdown of glucose).",
          "Anabolism: synthesising complex molecules from simpler substances, usually absorbing energy (e.g. amino acids synthesising proteins)."
        ]
      },
      {
        heading: "Characteristics of enzymes",
        points: [
          "Enzymes are biological catalysts and are proteins (their action is affected by temperature and pH).",
          "Enzymes can be reused and are not consumed by the reaction.",
          "Enzymes are specific (each enzyme catalyses only a particular substrate).",
          "Enzymes lower the activation energy needed for a reaction."
        ]
      },
      {
        heading: "Mechanism of enzyme action (lock-and-key hypothesis)",
        points: [
          "The active site of an enzyme has a specific shape; only a substrate that matches it completely can bind.",
          "The substrate binds to the enzyme to form an enzyme–substrate complex, which is then broken down to release the products; the enzyme is unchanged after the reaction and can bind with other substrate molecules.",
          "Lock-and-key hypothesis: only the right 'key' (substrate) can open the 'lock' (enzyme), explaining the specificity of enzymes."
        ]
      },
      {
        heading: "Effects of temperature and pH on enzymes",
        points: [
          "At low temperatures enzyme activity is low (inactive), but this is usually reversible.",
          "As temperature rises → the kinetic energy of enzyme and substrate increases and there are more collisions → the rate of reaction rises.",
          "At the optimum temperature the rate of reaction is fastest; different enzymes have different optimum temperatures.",
          "When the temperature is above the optimum → the enzyme protein denatures, the shape of the active site changes and cannot bind the substrate, and this is irreversible.",
          "Extreme pH also denatures enzymes (enzymes are proteins)."
        ]
      },
      {
        heading: "Applications of enzymes",
        points: [
          "Meat tenderiser (protease), biological washing powder (protease), contact-lens cleaner (protease), urine-glucose test strip (glucose oxidase).",
          "Making fruit juice (pectinase), lactose-free milk (lactase), biofuels."
        ]
      }
    ],
    longQuestions: [
      {
        q: "A student investigates the effect of pH on catalase extracted from bean sprouts. Explain why the paper disc rises to the surface of the solution, and state the optimum pH range of catalase. (Condensed from 2003 CE Q3b)",
        marks: "6 marks",
        answer: "Catalase breaks down hydrogen peroxide, releasing oxygen.\nWhen enough oxygen is produced, oxygen bubbles carry the paper disc up to the surface of the solution.\nThe optimum pH is about 7–9 (read from the curve).\nTo estimate more accurately, repeat the experiment using buffer solutions of small intervals within the range pH 7–9.\n(Supplementary) Keeping at 4°C does not denature the enzyme; after returning to room temperature its activity is similar to before."
      },
      {
        q: "In the 'ginger milk curd' experiment, fresh ginger juice makes milk set, while boiled ginger juice does not. Explain this phenomenon, and describe the role of temperature. (Condensed from 2008 CE Q6)",
        marks: "5 marks",
        answer: "Ginger juice contains an enzyme that can make milk set.\nEnzymes are proteins in nature; high temperature (boiling) denatures proteins.\nTherefore the enzyme in the boiled ginger juice loses its catalytic action and the milk cannot set.\nMilk only sets at about 65°C because that temperature suits the enzyme's activity; too high a temperature (boiling) denatures the enzyme, while too low a temperature gives low enzyme activity."
      }
    ]
  },
  {
    no: 6,
    name: "Food and Humans",
    sections: [
      {
        heading: "Autotrophic and heterotrophic nutrition",
        points: [
          "Autotrophic nutrition: organisms can carry out photosynthesis, synthesising organic food from simple inorganic substances (e.g. green plants).",
          "Heterotrophic nutrition: organisms need to take in ready-made organic food to obtain nutrients (e.g. animals, fungi)."
        ]
      },
      {
        heading: "Seven classes of food substances",
        points: [
          "Carbohydrates: main energy source, about 17.1 kJ per gram.",
          "Lipids: energy store, about 38.9 kJ per gram (highest energy).",
          "Proteins: growth and repair of body tissues, about 17.1 kJ per gram.",
          "Vitamins: needed only in small amounts; deficiency causes deficiency diseases (e.g. lack of vitamin C → scurvy, vitamin A → night blindness, vitamin D → rickets).",
          "Minerals: e.g. iron forms haemoglobin (lack of iron → anaemia), iodine forms thyroxine (lack of iodine → goitre), calcium forms bones.",
          "Water: solvent, transport medium, regulation of body temperature, reactant, dilution of waste.",
          "Dietary fibre: cellulose from plant cell walls, increases the bulk of food, stimulates peristalsis and aids defaecation (lack → constipation)."
        ]
      },
      {
        heading: "Food tests",
        points: [
          "Glucose: urine-glucose test strip (pink → purple/blue) or Benedict's test (brick-red precipitate).",
          "Reducing sugar: Benedict's test (brick-red precipitate).",
          "Starch: iodine test (brown → blue-black).",
          "Lipids: grease-spot test (permanent translucent spot).",
          "Protein: urine-protein test strip (yellow → green).",
          "Vitamin C: DCPIP test (blue DCPIP decolourised)."
        ]
      },
      {
        heading: "A balanced diet",
        points: [
          "Dietary requirements vary from person to person, affected by age, sex, daily activity level and physical condition.",
          "A balanced diet: take in all classes of food in appropriate proportions, avoiding excess or deficiency."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Compare the energy values of carbohydrates, lipids and proteins, and explain why the body uses fats as its main long-term energy store.",
        marks: "5 marks",
        answer: "Carbohydrates and proteins provide about 17.1 kJ per gram, while lipids provide about 38.9 kJ per gram.\nLipids provide the most energy per gram and occupy less space, making them suitable for long-term storage.\nExcess energy is mainly stored as fat in adipose tissue.\nGlycogen storage is limited (in the liver and muscles), so long-term energy storage mainly relies on fat."
      },
      {
        q: "What diseases are respectively caused by a deficiency of the following vitamins/minerals? Vitamin A, vitamin C, vitamin D, iron, iodine.",
        marks: "5 marks",
        answer: "Vitamin A → night blindness.\nVitamin C → scurvy.\nVitamin D → rickets (softening of bones in children).\nIron → anaemia (insufficient haemoglobin).\nIodine → goitre."
      }
    ]
  },
  {
    no: 7,
    name: "Human Nutrition",
    sections: [
      {
        heading: "Five processes of taking in food",
        points: [
          "Ingestion, digestion, absorption, assimilation and egestion.",
          "A tooth consists of the crown, neck and root; the permanent teeth of an adult are 2123 on each side (32 in total), and there are 20 milk teeth."
        ]
      },
      {
        heading: "Digestion (by class of food substance)",
        points: [
          "Starch: salivary amylase is secreted by the salivary glands in the mouth (starch → maltose); pancreatic amylase in the duodenum (starch → maltose); carbohydrates enzymes on the membrane of small-intestine epithelial cells (disaccharides → monosaccharides).",
          "Lipids: the liver secretes bile salts that emulsify fat into small droplets (increasing the surface area for lipase action); pancreatic lipase converts lipids → fatty acids + glycerol.",
          "Proteins: pepsin secreted by gastric glands (protein → peptides); trypsin (protein → peptides → amino acids); proteases on the membrane of small-intestine epithelial cells (peptides → amino acids)."
        ]
      },
      {
        heading: "Absorption and the functions of the liver",
        points: [
          "The villi of the small intestine have a large surface area, thin walls (single layer of cells) and a rich supply of capillaries, efficiently absorbing digested food.",
          "Functions of the liver: regulation of blood glucose (when blood glucose is high, glucose → glycogen for storage; when low, glycogen → glucose), deamination (excess amino acids → urea), secretion of bile (stored in the gall bladder), storage of glycogen/iron/fat-soluble vitamins, and breakdown of toxic substances (e.g. alcohol, drugs)."
        ]
      },
      {
        heading: "Movement of the alimentary canal",
        points: [
          "Peristalsis is the wave-like contraction of the muscles of the alimentary canal wall, pushing food forward and mixing it with digestive enzymes.",
          "The large intestine mainly absorbs water and forms faeces."
        ]
      }
    ],
    longQuestions: [
      {
        q: "A patient has had structure A (the gall bladder) removed. Explain why, after the operation, he cannot digest fatty food as usual. (Condensed from 1999 CE Q2b)",
        marks: "4 marks",
        answer: "The bile produced by the liver cannot be stored in the gall bladder.\nWhen food enters the duodenum, an insufficient amount of bile is released to emulsify the fat in the food.\nThe fat cannot be emulsified, so the surface area available for lipase action is reduced.\nTherefore the fat cannot be digested effectively."
      },
      {
        q: "What features of the villi of the small intestine help the absorption of digested food? (Condensed from 2004 CE Q1a)",
        marks: "5 marks",
        answer: "Villi are finger-like projections of the small-intestine wall, providing a large surface area for the absorption of food.\nThe villus epithelium is very thin (only a single layer of cells), shortening the distance of diffusion/transport of digested food.\nVilli have a rich supply of capillaries, which rapidly carry away absorbed food, maintaining a large concentration gradient to help absorption.\nLacteals inside the villi absorb the products of fat digestion."
      }
    ]
  },
  {
    no: 8,
    name: "Gas Exchange in Humans",
    sections: [
      {
        heading: "Air pathway and gas exchange in the air sacs",
        points: [
          "Air pathway: nasal cavity → pharynx → larynx → trachea → bronchi → bronchioles → alveoli (air sacs).",
          "The oxygen concentration in the air sacs is higher than that in the blood; oxygen dissolves in the thin film of water and diffuses across the air-sac wall and the capillary wall into the blood.",
          "The carbon dioxide concentration in the capillaries is higher than in the air sacs, so carbon dioxide diffuses into the air of the air sacs.",
          "The alveolar wall is thin, the surface is moist, the surface area is large and there is a rich supply of capillaries — all these features help gas exchange."
        ]
      },
      {
        heading: "Transport of oxygen and carbon dioxide",
        points: [
          "In the lungs, oxygen combines with haemoglobin in red blood cells to form oxyhaemoglobin; in the tissues, oxygen is released into the body cells.",
          "Transport of carbon dioxide: dissolved in plasma (5%); combined with haemoglobin to form carbaminohaemoglobin (10%); reacts with water to form hydrogencarbonate ions (85%).",
          "The cilia and mucus on the inner wall of the trachea trap dust and microorganisms and remove them."
        ]
      },
      {
        heading: "Mechanism of breathing",
        points: [
          "Inhalation: the diaphragm contracts and moves down, the ribs move up and out, the volume of the thoracic cavity increases, and the air pressure in the lungs falls below atmospheric pressure.",
          "Exhalation: the diaphragm relaxes and moves up, the ribs move down and in, the volume of the thoracic cavity decreases, and the air pressure in the lungs rises above atmospheric pressure.",
          "Compared with inhaled air, exhaled air contains less oxygen and more carbon dioxide."
        ]
      },
      {
        heading: "Difference between respiration and ventilation",
        points: [
          "Breathing (ventilation) is the process of gases moving in and out of the body.",
          "Respiration is the process of breaking down food to release energy inside cells (in the mitochondria)."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Describe and explain two features of the alveoli that help gas exchange.",
        marks: "4 marks",
        answer: "The alveolar wall is very thin (only one layer of cells), shortening the diffusion distance for gases and speeding up gas exchange.\nThe alveoli have a large surface area (numerous and sac-like), providing an extensive surface for gas exchange.\nThe alveolar surface is moist, dissolving the gases and helping diffusion.\nThe alveoli are surrounded by a rich network of capillaries, which rapidly carries away oxygen and brings carbon dioxide, maintaining a large concentration gradient."
      },
      {
        q: "A lung-disease patient has a hardened layer of dust deposited on the air sacs in his lungs. Suggest two ways in which this disease may hinder gas exchange. (Condensed from 2019 DSE 1B Q5)",
        marks: "4 marks",
        answer: "The dust deposit forms a barrier, increasing the diffusion distance and slowing the exchange of oxygen and carbon dioxide.\nThe inner surface of the air sacs is covered by dust, so the area available for diffusion is reduced.\nThe hardened dust reduces the elasticity of the lungs; when the lungs expand, the lung capacity is smaller and the ventilation volume is reduced."
      }
    ]
  },
  {
    no: 9,
    name: "Transport of Substances in Humans",
    sections: [
      {
        heading: "Blood and red blood cells",
        points: [
          "Red blood cells are biconcave disc-shaped (increasing the surface area for gas diffusion), flat (shortening the distance for oxygen to reach the inner part of the red blood cell), contain haemoglobin (carrying oxygen), and have no nucleus when mature (providing more space to contain haemoglobin).",
          "Plasma transports dissolved nutrients, urea, hormones, etc.; white blood cells are responsible for defence; platelets are responsible for blood clotting."
        ]
      },
      {
        heading: "Arteries, veins and capillaries",
        points: [
          "Arteries: thicker walls to withstand high blood pressure, muscular contraction regulates blood flow, elastic fibres maintain blood pressure.",
          "Veins: larger lumen reduces resistance to blood flow, valves prevent backflow of blood, ensuring one-way flow of blood back to the heart.",
          "Capillaries: branch into a huge network to increase the surface area for exchange, walls are only one cell thick to shorten the diffusion distance, and blood flow is slower allowing more time for exchange of substances."
        ]
      },
      {
        heading: "Pulmonary circulation and systemic circulation",
        points: [
          "Pulmonary circulation: right atrium → right ventricle → pulmonary artery → lungs (gas exchange) → pulmonary vein → left atrium.",
          "Systemic circulation: left atrium → left ventricle → aorta → all parts of the body → superior/inferior vena cava → right atrium.",
          "The wall of the left ventricle is thicker than that of the right ventricle because the left ventricle has to pump blood to the whole body (a longer distance).",
          "The coronary arteries supply oxygen and nutrients to the heart muscle; lack of oxygen in the heart muscle may cause death of the heart muscle (coronary heart disease)."
        ]
      },
      {
        heading: "Tissue fluid and the lymphatic system",
        points: [
          "Tissue fluid is formed from the blood in the capillary bed: at the arterial end of a capillary the blood pressure is higher, so components of plasma are squeezed out of the vessel wall to form tissue fluid.",
          "At the venous end the blood pressure is lower, and because plasma proteins remain in the blood, the tissue fluid has a higher water potential, so most of the water returns to the blood by osmosis.",
          "Excess tissue fluid enters the lymphatic capillaries and becomes lymph; lymph returns through the lymph vessels to the veins in the neck and into the heart.",
          "Functions of the lymphatic system: returning tissue fluid to the blood, transporting fats absorbed by the small intestine, and lymph nodes filter and destroy bacteria in the lymph."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Compare the blood pressure in arteries and veins, and give two reasons to explain the difference. (Condensed from 2002 CE Q4b)",
        marks: "4 marks",
        answer: "The blood pressure in veins is much lower than that in arteries.\nReason one: the blood in arteries is directly subjected to the pumping pressure of the heart, while that in veins is not.\nReason two: after the blood has flowed over a long distance, it has experienced a lot of friction/resistance.\n(Or) some fluid is lost from the blood in forming tissue fluid."
      },
      {
        q: "Describe how tissue fluid is formed, and explain how the lymphatic system returns excess tissue fluid to the blood.",
        marks: "6 marks",
        answer: "At the arterial end of a capillary, the blood pressure is higher than the pressure of the fluid surrounding the body cells, so water, minerals and glucose in the plasma are squeezed out of the vessel wall into the intercellular spaces to form tissue fluid.\nAt the venous end of a capillary, the blood pressure is lower than that of the tissue fluid; since plasma proteins and blood cells remain in the blood, the tissue fluid has a higher water potential than the blood, so most water returns to the blood by osmosis.\nThe remaining excess tissue fluid enters the lymphatic capillaries and becomes lymph.\nThe lymph flows back through the lymph vessels and finally returns to the heart through the veins near the neck."
      }
    ]
  },
  {
    no: 10,
    name: "Nutrition and Gas Exchange in Plants",
    sections: [
      {
        heading: "Internal structure of the root",
        points: [
          "Root cap: protects the tissues at the root tip.",
          "Root hairs: increase the surface area for absorbing water and minerals.",
          "Epidermis: protects the other tissues inside the root.",
          "Cortex: stores food and allows water and minerals to enter the root tissues.",
          "Vascular tissue: xylem (transports water and minerals), phloem (transports food)."
        ]
      },
      {
        heading: "Absorption of water and minerals",
        points: [
          "The water potential of soil water is higher than that of the cytoplasm and cell sap of root hair cells, so water enters the root hairs by osmosis, then passes through the cortical cells to reach the xylem vessels.",
          "Minerals can enter the root by active transport (against the concentration gradient); they can also dissolve in water and enter with the water flow; or they can enter by diffusion along the concentration gradient.",
          "The epidermal cells of the root have no cuticle, root hairs are long and thin, and there are many root branches and root hairs — all of these help the absorption of water and minerals."
        ]
      },
      {
        heading: "Internal structure of the leaf",
        points: [
          "The cuticle contains wax, reducing water loss and protecting the leaf.",
          "Palisade mesophyll: upper layer, elongated cells closely packed, containing many chloroplasts, carries out photosynthesis.",
          "Spongy mesophyll: lower layer, irregular in shape, loosely packed with air spaces, containing fewer chloroplasts.",
          "Vascular bundle: xylem above, phloem below.",
          "Guard cells contain chlorophyll and have unevenly thickened cell walls, controlling the opening and closing of stomata."
        ]
      },
      {
        heading: "Gas exchange and stomata",
        points: [
          "Sites of gas exchange in plants: stomata on the leaves or stems of herbaceous plants, lenticels on the stems of woody plants, and the epidermis of roots (root hairs provide a large surface area).",
          "At night, with no light, plants only carry out respiration: net uptake of oxygen, net release of carbon dioxide.",
          "Compensation point: the rate of photosynthesis equals the rate of respiration, so the plant has no net gas exchange.",
          "When the light intensity is above the compensation point: the plant has a net uptake of carbon dioxide and a net release of oxygen."
        ]
      }
    ],
    longQuestions: [
      {
        q: "State three features + adaptations of the plant root for absorbing water and minerals, and explain each.",
        marks: "6 marks",
        answer: "The epidermal cells have no cuticle, allowing water to enter the root easily.\nThere are many root branches and root hairs, increasing the surface area for absorbing water and minerals.\nRoot hairs are long and thin, enabling them to grow between soil particles to absorb the surrounding water and minerals.\nMinerals can be absorbed against the concentration gradient by active transport, so they can still be absorbed even when the ion concentration in the soil is low."
      },
      {
        q: "Compare the gas exchange of a plant leaf during the day (in light) and at night (in darkness), and explain the meaning of the compensation point.",
        marks: "6 marks",
        answer: "At night, with no light, the plant stops photosynthesis and only carries out respiration: net uptake of oxygen, net release of carbon dioxide.\nDuring the day, when the light intensity is above the compensation point, the rate of photosynthesis is higher than the rate of respiration: the plant has a net uptake of carbon dioxide, a net release of oxygen, and makes food.\nThe compensation point is the moment when the rate of photosynthesis equals the rate of respiration, so the plant has no net gas exchange.\nOnly when photosynthesis (food production) is greater than respiration (food consumption) does the plant have a net gain of food, which is extremely important for the survival and growth of the plant."
      }
    ]
  },
  {
    no: 11,
    name: "Transpiration, Transport and Support in Plants",
    sections: [
      {
        heading: "Transpiration",
        points: [
          "Transpiration is the process by which water evaporates from the plant surface and is lost to the atmosphere as water vapour; it mainly occurs at the stomata of leaves, with a small amount through the cuticle and lenticels.",
          "Importance of transpiration: produces a cooling effect; drives the transport of water and minerals in the xylem vessels; promotes the absorption of water and minerals by the roots from the soil.",
          "Factors affecting the rate of transpiration: light intensity, temperature, humidity and wind speed. Strong wind, high temperature and low humidity increase transpiration; high humidity and darkness decrease it.",
          "A potometer is used to measure the rate of water uptake by a plant, reflecting the rate of transpiration."
        ]
      },
      {
        heading: "Transport: xylem and phloem",
        points: [
          "The xylem is mainly made up of xylem vessels, transporting water and minerals; the vessels are hollow, have no cytoplasm, and have thick, lignified walls, facilitating water flow and preventing collapse.",
          "The phloem consists of sieve tubes and companion cells, transporting organic nutrients such as sucrose from the 'source' to the 'sink' — a process called translocation.",
          "Water is transported upward in the xylem by transpiration pull (negative pressure)."
        ]
      },
      {
        heading: "Support",
        points: [
          "Herbaceous plants/non-woody parts mainly rely on the turgidity (turgor pressure) of the parenchyma cells of the cortex and pith for support.",
          "Woody plants mainly rely on the hardness of the thick-walled cells (xylem) for support.",
          "Lignin is deposited in the cell walls of the xylem, providing strength and support."
        ]
      },
      {
        heading: "Adaptations of leaves for absorbing light, gas exchange, transport and reducing water loss",
        points: [
          "Absorbing light: the leaf blade is broad and flat, the leaf is thin, the leaf veins form a network supporting the blade, and the palisade mesophyll is at the upper layer with many chloroplasts.",
          "Gas exchange: the leaf is thin, shortening the diffusion distance for carbon dioxide; there are many stomata; guard cells control the opening and closing of stomata.",
          "Transport: the midrib and leaf veins contain vascular bundles (xylem + phloem), and the veins form a network ensuring efficient transport.",
          "Reducing water loss: the upper and lower epidermis have a cuticle; terrestrial plants generally have fewer stomata on the upper epidermis than on the lower epidermis."
        ]
      }
    ],
    longQuestions: [
      {
        q: "On a hot, sunny afternoon, a herbaceous plant (supported mainly by the turgor pressure of parenchyma cells) becomes wilted and its stem bends. Explain this phenomenon. (Condensed from 2001 CE Q3c)",
        marks: "5 marks",
        answer: "In hot, sunny conditions, the transpiration rate of the plant is higher than the water-uptake rate.\nThe parenchyma cells lose water and lose their turgidity (become soft and shrunken).\nThe turgor pressure of parenchyma cells is the main source of support for herbaceous plants.\nTherefore the stem loses support and bends, and the plant wilts.\nIn contrast, woody plants are supported by the hardness of the xylem, which is unaffected by water content, so they can remain upright."
      },
      {
        q: "Describe and explain two adaptive features of the xylem vessel as a structure for transporting water. (Condensed from 2019 DSE 1B Q10)",
        marks: "4 marks",
        answer: "The xylem vessel is a hollow tube, allowing water to flow through with low resistance.\nThe xylem vessel has thickened/lignified walls, able to withstand the negative pressure of the transpiration pull and prevent the xylem vessel from collapsing.\n(Also acceptable) There are no transverse walls between adjacent cells, so water can flow upward unobstructed."
      }
    ]
  },
  {
    no: 12,
    name: "Cell Cycle and Cell Division",
    sections: [
      {
        heading: "Chromatin and chromosomes",
        points: [
          "When the cell is not dividing, the chromosomes are in the form of thin threads called chromatin, and individual chromosomes cannot be seen under the microscope.",
          "Before division, the genetic material is replicated, and the chromatin coils and condenses into short, thick chromosomes.",
          "Homologous chromosomes are similar in size, shape, centromere position and gene positions, but may carry different alleles (Aa, Tt).",
          "Human body cells have 46 chromosomes (23 pairs, of which 22 pairs are autosomes and 1 pair is the sex chromosomes); gametes have 23 chromosomes."
        ]
      },
      {
        heading: "Cell cycle and mitosis",
        points: [
          "Interphase: the cell grows, synthesises proteins, forms new organelles, and DNA replicates.",
          "The four stages of mitosis: prophase (chromosomes become short and thick, nuclear membrane breaks down) → metaphase (chromosomes align at the equator, centromeres attach to spindle fibres) → anaphase (spindle fibres contract, sister chromatids separate and are pulled to the two poles) → telophase (new nuclear membranes form, chromosomes uncoil) → cytokinesis.",
          "Mitosis produces two diploid daughter cells genetically identical to the mother cell; it is used for growth, tissue repair and asexual reproduction."
        ]
      },
      {
        heading: "Meiosis",
        points: [
          "First meiotic division: in prophase I, homologous chromosomes pair up and exchange genetic material (crossing over); in anaphase I, homologous chromosomes separate.",
          "Second meiotic division: in anaphase II, sister chromatids separate.",
          "Meiosis produces four gametes with half the chromosome number (haploid); at fertilisation, two gametes fuse and the zygote restores the diploid number.",
          "Independent assortment and (non-sister chromatid) crossing over give gametes new genetic combinations; together with the random fusion of gametes at fertilisation, genetic variation is increased."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Compare the main differences between mitosis and meiosis in terms of process and outcome, and explain the importance of meiosis in sexual reproduction.",
        marks: "6 marks",
        answer: "Process: mitosis involves one division; meiosis involves two successive divisions (I and II).\nIn mitosis there is no pairing of homologous chromosomes; in meiosis prophase I there is pairing of homologous chromosomes and crossing over.\nIn mitosis, anaphase separates sister chromatids; in meiosis, the first division separates homologous chromosomes and the second division separates sister chromatids.\nOutcome: mitosis produces two diploid daughter cells identical to the mother cell; meiosis produces four haploid gametes with half the chromosome number.\nImportance: meiosis halves the chromosome number of gametes, so that the diploid number is restored after fertilisation; it also increases genetic variation through independent assortment, crossing over and random fertilisation."
      },
      {
        q: "Explain why the body cells of a Down syndrome patient have one extra chromosome 21 compared with normal people.",
        marks: "4 marks",
        answer: "A Down syndrome patient has three copies (one extra) of chromosome 21 in the autosomal pair.\nCause: when the gamete is formed by meiosis, the two members of the homologous pair of chromosome 21 fail to separate.\nThe abnormal gamete carrying the extra chromosome 21 fuses with a normal gamete.\nThis forms a zygote containing three copies of chromosome 21."
      }
    ]
  },
  {
    no: 13,
    name: "Reproduction in Flowering Plants",
    sections: [
      {
        heading: "Asexual reproduction (vegetative propagation) and sexual reproduction",
        points: [
          "Vegetative propagation is asexual reproduction: new individuals develop from the vegetative parts (stems, roots, leaves) of the parent.",
          "Offspring of asexual reproduction are genetically identical to the parent; it can rapidly produce large numbers of identical offspring, but lacks genetic variation.",
          "Sexual reproduction: parents produce gametes by meiosis; the male gamete fuses with the female gamete to form a zygote, and the offspring differ genetically from the parents."
        ]
      },
      {
        heading: "Pollination",
        points: [
          "Self-pollination: pollen is transferred to the stigma of the same flower or another flower of the same plant.",
          "Cross-pollination: pollen is transferred to the stigma of a flower of another plant of the same species, resulting in cross-fertilisation and increasing genetic variation.",
          "Characteristics of insect-pollinated flowers: large, brightly coloured petals, nectar, sticky and heavy pollen.",
          "Characteristics of wind-pollinated flowers: small petals, light, dry and numerous pollen grains, no nectar."
        ]
      },
      {
        heading: "Fertilisation and the formation of seeds and fruits",
        points: [
          "After the pollen reaches the stigma, it germinates to form a pollen tube; the pollen tube grows down the style to reach the ovule/micropyle.",
          "The male gamete is released and fuses with the female gamete inside the ovule (fertilisation).",
          "The zygote develops into the embryo; the ovule develops into the seed; the integument develops into the seed coat; the ovary wall develops into the pericarp (fruit wall).",
          "Functions of the fruit: protecting the seeds and helping in the dispersal of seeds."
        ]
      },
      {
        heading: "Seed dispersal",
        points: [
          "Seed dispersal avoids overcrowding and competition among the offspring (for water, sunlight, nutrients and space).",
          "Animal dispersal: seeds with hooks or juicy fruits; wind dispersal: light seeds that may have wings or hairs."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Compare the characteristics of insect-pollinated flowers and wind-pollinated flowers, and explain how these characteristics help pollination.",
        marks: "6 marks",
        answer: "Insect-pollinated flowers: large, brightly coloured petals, with scent and nectar, attracting insects; pollen is sticky and heavy, adhering to the insects' bodies, and the number of pollen grains is relatively small.\nWind-pollinated flowers: small or inconspicuous petals, no nectar; the anthers hang outside the flower, the pollen is light, dry and numerous, easily blown by the wind; the stigmas are large and feathery, increasing the chance of catching pollen.\nThese characteristics respectively adapt the flower to using insects or wind as the agent to transfer pollen to the stigma."
      },
      {
        q: "In mid-nineteenth-century Ireland, potato crops were seriously infected by a pathogen, causing many deaths. Explain why the vegetative propagation of potatoes was regarded as the culprit for the crops being easily infected. (Condensed from 2019 DSE 1B Q6(e))",
        marks: "3 marks",
        answer: "The offspring produced by vegetative propagation have a genetic constitution identical to the parent.\nThis provides limited raw material for natural selection to produce resistant strains.\nIf the parent's genotype is susceptible to attack by the pathogen, the whole population is the same and can easily be wiped out."
      }
    ]
  },
  {
    no: 14,
    name: "Reproduction in Humans",
    sections: [
      {
        heading: "Male reproductive system",
        points: [
          "Testes: the seminiferous tubules produce sperms, and the testes also produce the male sex hormone (testosterone).",
          "Epididymis: temporarily stores sperms and allows them to mature; the sperm duct and urethra carry sperms out of the body.",
          "The seminal vesicles, prostate gland and Cowper's glands secrete fluids that mix with sperms to form semen, activating and providing nutrients for sperms, and neutralising the acidity of the vagina.",
          "Testosterone promotes the development of male secondary sexual characteristics (e.g. deep voice)."
        ]
      },
      {
        heading: "Female reproductive system and fertilisation",
        points: [
          "The ovaries produce eggs and female sex hormones (oestrogen, progesterone); the oviducts move the egg towards the uterus by means of cilia; the uterus protects the embryo; the vagina is the birth canal.",
          "Fertilisation occurs in the oviduct: the nucleus of the sperm fuses with the nucleus of the egg to form a zygote.",
          "Monozygotic twins develop from one zygote and are genetically identical; dizygotic twins develop from two zygotes."
        ]
      },
      {
        heading: "Protection of the embryo and exchange of substances",
        points: [
          "Functions of the amniotic fluid: protecting the fetus from mechanical injury, preventing drying out, allowing the embryo room to move, and providing a stable environment.",
          "The placenta allows the exchange of substances between the embryo and the mother, but their bloods never mix.",
          "The umbilical cord contains two umbilical arteries and one umbilical vein; oxygenated blood is carried to the fetus through the umbilical vein.",
          "Benefits of separating the blood of the fetus and the mother: avoiding high blood pressure of the mother's blood damaging the fragile fetus; preventing pathogens in the mother's blood from entering the fetus; and avoiding blood clots due to different blood groups."
        ]
      },
      {
        heading: "Methods of contraception",
        points: [
          "Natural methods: avoiding intercourse during the fertile period.",
          "Hormonal methods: combined contraceptive pills contain synthetic oestrogen and progesterone to inhibit ovulation; progestogen-only pills thicken the cervical mucus.",
          "Barrier methods: condoms and diaphragms prevent the sperm and egg from meeting.",
          "An intrauterine device prevents the fertilised egg from implanting in the uterine lining; vasectomy and tubal ligation are surgical methods of contraception."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Why must the blood of the fetus be separated from that of the mother? Give two reasons. (Condensed from 2016 DSE Q2)",
        marks: "3 marks",
        answer: "To avoid the formation of clots when the bloods are incompatible.\nTo prevent some pathogens/toxins in the mother's blood from entering the fetus directly.\nTo avoid the high blood pressure of the mother's blood rupturing the fetal blood vessels."
      },
      {
        q: "A woman uses the 'rhythm' method of contraception and takes her body temperature every morning. Explain why this method is unreliable and cannot predict the whole fertile period. (Condensed from 2006 CE Q7)",
        marks: "4 marks",
        answer: "Body temperature rises suddenly at ovulation, so this method can only tell when ovulation occurs through the rise in temperature.\nBut the fertile period before ovulation (sperms survive for several days; the ovulation date may vary) cannot be predicted.\nEggs and sperms can survive in the reproductive tract for several days, so the fertile period covers several days before and after ovulation.\nTherefore the 'rhythm' method can only predict part of the fertile period and is unreliable."
      }
    ]
  },
  {
    no: 15,
    name: "Growth and Development",
    sections: [
      {
        heading: "Growth and development",
        points: [
          "Growth is a permanent and irreversible increase in dry mass and volume, brought about by cell division and cell enlargement.",
          "Development is an increase in complexity, involving cell differentiation/specialisation.",
          "Measuring dry mass: dry the organism in an oven at just above 100°C until the mass remains constant.",
          "Growth curves are usually S-shaped."
        ]
      },
      {
        heading: "Germination of seeds",
        points: [
          "Seed germination requires water, a suitable temperature and oxygen.",
          "The plumule develops into the stem and leaves; the radicle develops into the root; the cotyledons contain food reserves for the growth of the embryo.",
          "During early germination the dry mass decreases (stored food is consumed by respiration); after green leaves appear the dry mass increases (photosynthesis faster than respiration).",
          "The radicle is the first to break through the seed coat, absorbing water and anchoring the plant."
        ]
      },
      {
        heading: "Meristems and plant growth",
        points: [
          "Apical meristems are located at the root tips and shoot tips and are responsible for primary growth (elongation).",
          "Lateral meristems (vascular cambium) are responsible for secondary growth (increase in girth).",
          "The three regions of the root tip: the region of cell division, the region of elongation (cells absorb water and enlarge, causing root and shoot elongation), and the region of differentiation."
        ]
      },
      {
        heading: "Human growth and hormones",
        points: [
          "Human growth is divided into five stages: fetal, infancy, childhood, adolescence and adulthood; the highest growth rates occur in infancy and adolescence.",
          "The phototropism of plants is mainly caused by auxin; auxin promotes the growth of shoots, while high concentrations inhibit the growth of roots."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Explain why the dry mass of a seedling decreases at the beginning of germination, but starts to increase after green leaves appear. (Condensed from 2004 CE Q1b)",
        marks: "5 marks",
        answer: "At the beginning of germination, the seedling has not yet produced green leaves and can only rely on the food stored in the seed.\nThe stored starch is broken down by amylase into sugars, which are consumed by respiration to supply energy, so the dry mass decreases.\nAfter the seedling produces green leaves, it can carry out photosynthesis.\nWhen the rate of photosynthesis (food production) is higher than the rate of respiration (food consumption), there is a net gain of organic matter.\nTherefore the dry mass starts to increase."
      },
      {
        q: "Compare the advantages and disadvantages of measuring the 'fresh mass' and 'dry mass' of a plant as indicators of growth, and explain why dry mass is more accurate.",
        marks: "5 marks",
        answer: "Fresh mass includes water and fluctuates with the water content, so it cannot accurately reflect the increase in organic matter.\nDry mass is the mass after all the water has been removed, reflecting the true biomass (organic matter).\nMeasuring dry mass requires drying the sample to a constant mass (about 100°C), which is time-consuming and destroys the sample.\nTherefore, to measure plant growth accurately, dry mass rather than fresh mass should be measured."
      }
    ]
  },
  {
    no: 16,
    name: "Stimuli, Receptors and Responses",
    sections: [
      {
        heading: "Eye: accommodation of pupil and lens",
        points: [
          "Bright light: the circular muscles of the iris contract and the radial muscles relax, so the pupil becomes smaller; dim light: the circular muscles relax and the radial muscles contract, so the pupil becomes larger.",
          "Looking at near objects: the ciliary muscles contract, the tension of the suspensory ligaments decreases, and the lens becomes thicker; looking at far objects: the ciliary muscles relax and the lens becomes thinner.",
          "Light is refracted by the cornea, aqueous humour, lens and vitreous humour and focused on the retina.",
          "Rod cells detect light in dim light (black-and-white vision); cone cells distinguish colours in bright light and are concentrated mainly at the fovea (yellow spot).",
          "Vision is formed in the visual centre of the cerebral cortex; myopia is corrected with concave lenses (eyeball too long or lens too convex)."
        ]
      },
      {
        heading: "Ear",
        points: [
          "The cochlea converts the vibrations of sound waves into nerve impulses; the ear ossicles amplify the vibrations and transmit them to the oval window.",
          "The semicircular canals detect rotation of the head and body balance.",
          "The Eustachian tube balances the air pressure on the two sides of the eardrum."
        ]
      },
      {
        heading: "Reflex actions",
        points: [
          "A reflex action is a rapid, involuntary and unlearned response to a stimulus that does not involve the brain.",
          "Receptors convert stimuli into nerve impulses; effectors (e.g. muscles) produce responses.",
          "Reflex arc: receptor → sensory neurone → central nervous system (spinal cord/medulla) → motor neurone → effector."
        ]
      },
      {
        heading: "Plant tropisms and auxin",
        points: [
          "Stems are positively phototropic (grow towards light), allowing leaves to absorb the most sunlight for photosynthesis.",
          "Unilateral light causes auxin to move from the lit side to the shaded side; the shaded side grows faster, so the shoot bends towards the light.",
          "Low concentrations of auxin promote root growth; high concentrations promote shoot growth but inhibit root growth.",
          "Roots are positively geotropic (grow downwards) and stems are negatively geotropic (grow upwards)."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Describe and explain the mechanism of phototropism in a plant shoot under unilateral light.",
        marks: "5 marks",
        answer: "Unilateral light causes auxin to move from the lit side to the shaded side.\nA higher concentration of auxin promotes the growth of shoots.\nTherefore the shaded side of the shoot grows faster than the lit side.\nThe faster-growing side makes the shoot bend and grow towards the light source.\nThis places the leaves in the best position to absorb the most sunlight for photosynthesis."
      },
      {
        q: "A man sees an object he has seen before. With reference to the functional areas of the brain, explain how he recognises the object.",
        marks: "4 marks",
        answer: "Light enters the eye and forms an image on the retina; the photoreceptor cells send out nerve impulses.\nThe nerve impulses are transmitted along the optic nerve to the sensory area of the brain, producing vision.\nThe information is transmitted to the association area, where it is interpreted according to the memories stored from past experience.\nTherefore the man can recognise the object."
      }
    ]
  },
  {
    no: 17,
    name: "Coordination in Humans",
    sections: [
      {
        heading: "Nervous system and neurones",
        points: [
          "The nervous system is divided into the central nervous system (brain, spinal cord) and the peripheral nervous system (cranial nerves, spinal nerves).",
          "A neurone consists of a cell body, dendrites (transmitting impulses towards the cell body) and an axon (transmitting impulses away).",
          "Sensory neurones transmit impulses from receptors to the central nervous system; motor neurones transmit impulses from the central nervous system to effectors; relay (intermediate) neurones connect neurones within the central nervous system.",
          "Synapse: the nerve ending secretes a neurotransmitter which diffuses across the synaptic cleft to stimulate the adjacent neurone; this ensures one-way transmission of impulses and allows one neurone to communicate with many neurones."
        ]
      },
      {
        heading: "Brain and spinal cord",
        points: [
          "Cerebrum: responsible for intelligence, thinking and memory, and controls voluntary actions; it is divided into sensory, association and motor areas.",
          "Cerebellum: coordinates the activities of skeletal muscles and maintains body balance.",
          "Medulla oblongata: controls involuntary actions such as breathing and heartbeat, and many reflexes.",
          "Spinal cord: transmits nerve impulses between the brain and the body, and serves as the centre of spinal reflexes.",
          "The cerebrum and cerebellum have grey matter on the outside and white matter inside; the medulla is the reverse."
        ]
      },
      {
        heading: "Endocrine system (hormonal coordination)",
        points: [
          "Hormones are secreted by endocrine (ductless) glands, enter the blood directly, and are transported to all parts of the body through the blood.",
          "Hormones are specific and act only on particular target organs.",
          "Pituitary: secretes growth hormone, etc.; thyroid: thyroxine controls metabolism; pancreas: insulin and glucagon control blood glucose; adrenal glands: adrenaline; testes/ovaries: sex hormones.",
          "Compared with the nervous system, hormones are transmitted more slowly but their effects last longer."
        ]
      },
      {
        heading: "Regulation of blood glucose",
        points: [
          "Blood glucose high → the pancreas secretes more insulin → the liver converts glucose to glycogen and body cells take up more glucose → blood glucose falls.",
          "Blood glucose low → the pancreas secretes more glucagon → the liver converts glycogen to glucose → blood glucose rises.",
          "Diabetic patients (insufficient insulin) have blood glucose that is too high, and their urine may contain sugar."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Using a flow diagram, show the pathway of nerve transmission in 'the pupil becomes smaller in bright light', including the types of neurones involved. (Condensed from 2004 CE Q2c)",
        marks: "4 marks",
        answer: "Receptor (photoreceptor cells of the retina) → sensory neurone → central nervous system (brain/relay neurone) → motor neurone → effector (muscles of the iris).\nThe circular muscles of the iris contract, making the pupil smaller and reducing the amount of light entering the eye."
      },
      {
        q: "Describe how a nerve impulse passes across the neuromuscular junction, thereby causing muscle contraction. (Condensed from 2015 DSE 1B Q5)",
        marks: "4 marks",
        answer: "The nerve impulse reaches the end of the axon and triggers the release of a neurotransmitter (chemical messenger) into the neuromuscular junction.\nThe neurotransmitter crosses the synapse by diffusion.\nThe neurotransmitter binds with receptors on the muscle fibre membrane.\nAn electrical impulse is initiated in the muscle fibre, causing the muscle to contract."
      }
    ]
  },
  {
    no: 18,
    name: "Movement in Humans",
    sections: [
      {
        heading: "Bones and their functions",
        points: [
          "The skeleton is divided into the axial skeleton (skull, vertebral column, ribcage) and the appendicular skeleton (limb bones, pectoral girdle, pelvic girdle).",
          "Functions of the skeleton: supporting the body, allowing movement, protecting internal organs, producing blood cells (red bone marrow), and storing minerals and fat.",
          "Articular cartilage reduces friction between bones; synovial fluid lubricates the joint; ligaments connect bone to bone; tendons connect muscle to bone."
        ]
      },
      {
        heading: "Types of joints",
        points: [
          "Synovial joints are movable joints, made up of ligaments, a synovial membrane and cartilage.",
          "Hinge joints (elbow, knee) allow movement in one plane.",
          "Ball-and-socket joints (shoulder, hip) allow movement in several planes and have the greatest range of movement."
        ]
      },
      {
        heading: "Muscles and antagonistic muscles",
        points: [
          "Skeletal muscles are attached to bones through tendons, which effectively transmit the pulling force produced by muscle contraction to the bones.",
          "Muscles work in pairs in opposite action, called antagonistic muscles (e.g. biceps as flexor, triceps as extensor).",
          "Flexor contracts and extensor relaxes → the limb bends; extensor contracts and flexor relaxes → the limb straightens.",
          "The energy required for muscle contraction comes from respiration."
        ]
      },
      {
        heading: "Processes causing muscle contraction",
        points: [
          "Nerve impulses reach the end of the axon through motor neurones.",
          "The end of the axon releases a neurotransmitter which diffuses across the neuromuscular junction.",
          "The neurotransmitter stimulates the muscle fibres to produce electrical impulses.",
          "The electrical impulses spread through the muscle fibres, causing muscle contraction."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Outline how ligament (A) and tendon (B) work together to allow movement at a joint. (Condensed from 2013 DSE 1B Q2)",
        marks: "4 marks",
        answer: "Ligaments bind the bones together, preventing the bones from dislocating during movement.\nTendons attach muscles to bones and transmit the pulling force produced when the muscles contract.\nWhen a muscle contracts, it pulls the bone towards the muscle through the tendon, causing movement at the joint."
      },
      {
        q: "Explain why old people are more likely to suffer from bone fractures.",
        marks: "4 marks",
        answer: "The hardness of bone comes from inorganic components such as calcium salts, while the elasticity comes from organic components such as proteins.\nIn old people, the protein (organic component) in bone decreases, and the proportion of calcium salts is relatively higher.\nThe bone therefore becomes more brittle and less elastic.\nSo it is more easily broken (fractured)."
      }
    ]
  },
  {
    no: 19,
    name: "Homeostasis",
    sections: [
      {
        heading: "Negative feedback mechanism",
        points: [
          "Homeostasis is the maintenance of the internal environment of the body in a relatively stable state.",
          "Negative feedback: when a parameter deviates from the set value, an opposite response is produced to bring the parameter back to its normal level.",
          "It includes the regulation of blood glucose, body temperature and water content."
        ]
      },
      {
        heading: "Regulation of blood glucose",
        points: [
          "Blood glucose above normal: the pancreas secretes more insulin and less glucagon; insulin stimulates liver cells to convert glucose to glycogen and stimulates body cells to take up more glucose for respiration.",
          "Blood glucose below normal: the pancreas secretes more glucagon and less insulin; glucagon stimulates liver cells to convert glycogen to glucose.",
          "Both insulin and glucagon are secreted by the pancreas."
        ]
      },
      {
        heading: "Diabetes mellitus",
        points: [
          "Type I (insulin-dependent): the β cells of the pancreas are destroyed, so no or very little insulin can be made; it usually occurs at a young age and requires insulin injection.",
          "Type II (non-insulin-dependent): target cells are unresponsive to insulin; it is related to an unhealthy lifestyle such as obesity and lack of exercise; it can be controlled by diet and exercise.",
          "After a Type I diabetic drinks glucose: blood glucose rises to a higher level, takes longer to return to normal, and the blood insulin level is lower than that of healthy people."
        ]
      },
      {
        heading: "Kidneys and excretion",
        points: [
          "The kidneys are excretory organs, excreting urea, excess water and salts.",
          "The nephron is the functional unit of the kidney, carrying out ultrafiltration and reabsorption.",
          "Normal urine does not contain protein or glucose."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Xiao Dong has diabetes mellitus. Explain which type of diabetes he has, and explain the difference in his blood glucose response after drinking a glucose solution compared with a healthy person. (Condensed from 2012 DSE 1B Q7)",
        marks: "6 marks",
        answer: "Xiao Dong has insulin-dependent (Type I) diabetes.\nEven when the blood glucose is at a high level, his blood insulin level is lower than that of a healthy person, showing that he cannot produce a normal amount of insulin.\nWithout enough insulin, his efficiency in taking up glucose from the blood is lower.\nTherefore, after taking glucose, his blood glucose concentration rises to a higher level.\nAnd it is maintained at a high level for a longer time.\nTreatment: injection of insulin."
      },
      {
        q: "Describe how insulin lowers the blood glucose level. (Condensed from 2018 DSE 1B Q7)",
        marks: "4 marks",
        answer: "It stimulates body cells and liver cells to take up more glucose from the blood.\nIt stimulates body cells to increase respiration, consuming glucose.\nIt stimulates liver/muscle cells to convert glucose to glycogen for storage.\nTherefore the blood glucose level falls."
      }
    ]
  },
  {
    no: 20,
    name: "Ecosystems",
    sections: [
      {
        heading: "Ecological organisation and factors",
        points: [
          "Levels of organisation from small to large: species → population → community → ecosystem → biome → biosphere.",
          "Abiotic factors: light, temperature, rainfall, humidity, wind speed, water current, oxygen concentration, salinity, soil properties.",
          "Biotic factors: relationships among organisms such as reproductive rate, predatory ability, competition and parasitism.",
          "An ecosystem includes the interactions between the living community and its abiotic environment."
        ]
      },
      {
        heading: "Food chains and energy flow",
        points: [
          "Food chain: producer → primary consumer → secondary consumer → ...; producers are usually green plants, converting light energy into chemical energy.",
          "Food webs reflect the complex feeding relationships in an ecosystem.",
          "As energy is transferred along a food chain, most is lost as heat, so energy decreases at each level.",
          "Decomposers (bacteria and fungi) break down dead organisms and waste into inorganic substances."
        ]
      },
      {
        heading: "Pyramids of numbers and pyramids of biomass",
        points: [
          "A pyramid of numbers shows the number of organisms at each trophic level; a pyramid of biomass shows the total dry mass at each trophic level.",
          "Explanation of an upright pyramid: not all the energy of a lower trophic level is transferred to a higher level (energy is lost through respiration), and the organisms of lower trophic levels are smaller, so more low-level organisms are needed to support the higher levels.",
          "In the ocean, producers (phytoplankton) are small but have a high reproductive rate and high turnover rate, so the pyramid of numbers or biomass may be inverted."
        ]
      },
      {
        heading: "Nitrogen cycle and carbon cycle",
        points: [
          "Nitrogen is added to the soil in the form of nitrates through nitrogen fixation, ammonification and nitrification; nitrates are absorbed by producers to synthesise organic compounds; nitrogen returns to the atmosphere through denitrification.",
          "Carbon cycle: photosynthesis absorbs carbon dioxide; respiration and combustion release carbon dioxide.",
          "Nitrogen fixation converts atmospheric nitrogen into forms usable by plants; nitrification converts ammonium into nitrates; denitrification converts nitrates into nitrogen gas."
        ]
      },
      {
        heading: "Succession and sampling methods",
        points: [
          "Primary succession begins in bare places with no living organisms (e.g. new islands formed by volcanic eruptions) and takes a longer time.",
          "Secondary succession occurs after an original community has been destroyed (e.g. by fire) and takes a shorter time because the soil and some species already exist.",
          "Quadrat: a square frame placed randomly to estimate the number of plants or sedentary organisms.",
          "Line/belt transect: used to study the distribution of species along a line and their relationship with abiotic factors."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Describe the roles of the main processes in the nitrogen cycle (nitrogen fixation, ammonification, nitrification and denitrification).",
        marks: "6 marks",
        answer: "Nitrogen fixation: nitrogen-fixing bacteria convert atmospheric nitrogen gas into ammonia/plant-usable nitrogen compounds.\nAmmonification: decomposers convert the organic nitrogen of dead organisms into ammonium compounds.\nNitrification: nitrifying bacteria convert ammonium into nitrites and nitrates.\nNitrates are absorbed by producers to synthesise organic compounds such as proteins.\nDenitrification: denitrifying bacteria convert nitrates into nitrogen gas, which returns to the atmosphere."
      },
      {
        q: "The food chain in a marine ecosystem is 'phytoplankton → fish → shark'. Draw its pyramid of numbers and explain its shape. (Condensed from 2015 DSE 1B Q3)",
        marks: "5 marks",
        answer: "The pyramid is an upright triangle: the base is the large number of phytoplankton, the middle is fish, and the top is the few sharks.\nExplanation: not all the energy of a lower trophic level is transferred to a higher level; energy is lost along the food chain through respiration.\nThe organisms of the lower trophic levels are smaller in size.\nTherefore more organisms of the lower trophic levels are needed to support the organisms of the higher trophic levels."
      }
    ]
  },
  {
    no: 21,
    name: "Photosynthesis",
    sections: [
      {
        heading: "Importance of photosynthesis",
        points: [
          "Provides the basic food source.",
          "Maintains the energy flow in ecosystems.",
          "Maintains the balance of oxygen and carbon dioxide in the atmosphere.",
          "Raw materials: carbon dioxide and water; products: glucose and oxygen."
        ]
      },
      {
        heading: "Adaptations of the leaf",
        points: [
          "Absorbing light energy: the leaf blade is broad and flat, the leaf is thin, the leaf veins form a supporting network, and the palisade mesophyll is at the upper layer with many chloroplasts.",
          "Gas exchange: the leaf is thin, shortening the diffusion distance for carbon dioxide; there are many stomata; guard cells control their opening and closing.",
          "Transport: the leaf veins contain vascular bundles (xylem + phloem).",
          "Reducing water loss: the upper and lower epidermis have a cuticle, and terrestrial plants have fewer stomata on the upper epidermis."
        ]
      },
      {
        heading: "Light-dependent reaction and light-independent reaction (Calvin cycle)",
        points: [
          "The light-dependent reaction occurs in the thylakoids: chlorophyll absorbs light energy, water is photolysed (2H₂O → 4H⁺ + 4e⁻ + O₂), ATP and NADPH are produced, and oxygen is released to the atmosphere as a by-product.",
          "The light-independent reaction (Calvin cycle) occurs in the stroma of the chloroplast: it uses ATP and NADPH to fix carbon dioxide and manufacture carbohydrates.",
          "The light-independent reaction does not need light to drive it, but it needs the ATP and NADPH produced by the light-dependent reaction; without light the light-independent reaction also stops."
        ]
      },
      {
        heading: "Factors affecting the rate of photosynthesis",
        points: [
          "Light intensity: the rate rises as light intensity increases; beyond a certain level it stays constant because it is limited by other factors.",
          "Carbon dioxide concentration: the rate rises as the concentration increases until limited by other factors.",
          "Temperature: as temperature rises, the metabolic rate rises and the rate increases; above a certain level, enzymes denature and the rate falls."
        ]
      },
      {
        heading: "Testing for the products of photosynthesis",
        points: [
          "Testing for starch: first place the plant in darkness to use up the starch originally in the leaves, then kill the cells with boiling water, decolourise with hot alcohol, and finally test with iodine solution (turns blue-black).",
          "Testing for the release of oxygen: it relights a glowing splint."
        ]
      }
    ],
    longQuestions: [
      {
        q: "An electron micrograph of a certain organelle shows the thylakoid membrane (A) and the stroma (B). Explain the functional relationship between A and B. (Condensed from 2016 DSE 1B Q3)",
        marks: "4 marks",
        answer: "The light-dependent reactions occur in A (the thylakoid membrane).\nThese reactions provide ATP energy and NADPH.\nFor the light-independent reactions (Calvin cycle) to occur in B (the stroma).\nConversely, the light-independent reactions regenerate NADP so that the light-dependent reactions can continue in A."
      },
      {
        q: "What is the importance of the two products of the photochemical reactions to the whole process of photosynthesis? (Condensed from 2017 DSE 1B Q7)",
        marks: "4 marks",
        answer: "The photochemical reactions produce ATP.\nATP provides energy to drive the light-independent reactions/for regenerating the carbon dioxide acceptor.\nThe photochemical reactions also produce NADPH.\nNADPH provides reducing power to reduce the three-carbon compounds to produce glucose."
      }
    ]
  },
  {
    no: 22,
    name: "Respiration",
    sections: [
      {
        heading: "Types and sites of respiration",
        points: [
          "Aerobic respiration occurs in the presence of oxygen; anaerobic respiration does not require oxygen.",
          "The reactions occur in the cytoplasm (glycolysis) and the mitochondria (the remaining stages).",
          "Adaptations of mitochondria: the inner membrane is highly folded to increase the surface area for more enzymes and carriers; the matrix contains the enzymes needed for respiration.",
          "ATP is broken down by hydrolysis into ADP and phosphate, releasing energy."
        ]
      },
      {
        heading: "The four stages of aerobic respiration",
        points: [
          "Glycolysis (cytoplasm): glucose → 2 triose phosphates → 2 pyruvate, producing a net of 2 ATP and 2 NADH.",
          "Link reaction (mitochondrial matrix): pyruvate → acetyl coenzyme A, producing 2 CO₂ and 2 NADH.",
          "Krebs cycle (mitochondrial matrix): produces 4 CO₂, 6 NADH, 2 FADH and 2 ATP.",
          "Oxidative phosphorylation (inner mitochondrial membrane): NADH and FADH act as hydrogen donors; electrons move along the electron transport chain and are finally accepted by oxygen to form water; 1 NADH produces 3 ATP and 1 FADH produces 2 ATP.",
          "Oxidative phosphorylation is the only stage that uses oxygen; without oxygen, NAD and FAD cannot be regenerated and the aerobic pathway stops."
        ]
      },
      {
        heading: "Anaerobic respiration",
        points: [
          "Lactate fermentation (skeletal muscle): glucose → 2 lactate + 2 ATP; the extra oxygen needed to break down the lactate is called the oxygen debt.",
          "Alcoholic fermentation (yeast, some plant tissues): glucose → 2 ethanol + 2 carbon dioxide + 2 ATP.",
          "Similarities between aerobic and anaerobic respiration: both are oxidation processes, both release part of the energy for ATP production, both are controlled by enzymes, and both begin with glycolysis."
        ]
      },
      {
        heading: "Difference between respiration and ventilation",
        points: [
          "Respiration is the process of breaking down organic substances inside cells to release energy.",
          "Ventilation is the process of gases moving in and out of the body.",
          "Lime water turning milky can test for the production of carbon dioxide in respiration; a thermos-flask experiment shows that respiration releases heat energy."
        ]
      }
    ],
    longQuestions: [
      {
        q: "After running for ten minutes, an athlete's blood lactate concentration increases. Explain this phenomenon, and compare the effectiveness of sitting and jogging in removing lactate. (Condensed from 2004 CE Q4a)",
        marks: "6 marks",
        answer: "During vigorous exercise, the energy demand increases and the oxygen supply is insufficient to meet the energy needs of the muscles.\nThe muscles carry out anaerobic respiration to release extra energy for muscle contraction.\nAnaerobic respiration produces lactate, so the blood lactate concentration increases.\nA large amount of lactate lowers the pH of the blood/tissue fluid, having an adverse effect on cell activities.\nJogging is more effective: jogging maintains a higher heart rate/blood flow rate, increasing the rate at which oxygen is supplied to the body.\nThis promotes the breakdown of lactate/conversion of lactate to glycogen."
      },
      {
        q: "Compare aerobic respiration and anaerobic respiration in terms of products, energy release and sites.",
        marks: "5 marks",
        answer: "Products of aerobic respiration: carbon dioxide, water and a large amount of energy (ATP); products of anaerobic respiration: lactate (in animal muscle) or ethanol + carbon dioxide (in yeast).\nAerobic respiration releases much more energy than anaerobic respiration.\nAerobic respiration needs oxygen as the final electron acceptor; anaerobic respiration does not need oxygen.\nThe first stage, glycolysis, of both occurs in the cytoplasm; the remaining stages of aerobic respiration occur in the mitochondria, while anaerobic respiration takes place entirely in the cytoplasm."
      }
    ]
  },
  {
    no: 23,
    name: "Personal Health and Infectious Diseases",
    sections: [
      {
        heading: "Infectious diseases and pathogens",
        points: [
          "Infectious diseases are caused by pathogens and can be transmitted from person to person; non-infectious diseases cannot be transmitted between people.",
          "Pathogens include viruses, bacteria, protozoa (e.g. the malaria parasite), fungi, etc.",
          "Viruses are not cells and must live as parasites inside living cells to reproduce; antibiotics are ineffective against viruses.",
          "Routes of transmission: droplets (e.g. tuberculosis), food and water (e.g. cholera), vectors (e.g. mosquitoes transmitting malaria and dengue fever), and blood (e.g. hepatitis B, AIDS)."
        ]
      },
      {
        heading: "Antibiotics and sulphonamide drugs",
        points: [
          "Antibiotics can kill bacteria or inhibit their growth (the earliest was penicillin); their actions include inhibiting cell wall synthesis, inhibiting nucleic acid replication or protein synthesis, and disrupting the cell membrane.",
          "Sulphonamide drugs are enzyme inhibitors: they bind to the active site of the enzyme that makes folic acid, slowing or stopping the bacteria from synthesising folic acid.",
          "Consequences of antibiotic misuse: the appearance of resistant bacteria (superbugs), the destruction of beneficial bacteria promoting the growth of pathogenic bacteria, and the need for new drugs."
        ]
      },
      {
        heading: "Development of drug resistance",
        points: [
          "There is genetic variation within a bacterial population; some bacteria are resistant to an antibiotic.",
          "Increased use of antibiotics kills non-resistant bacteria, while the resistant bacteria continue to survive and reproduce.",
          "After several generations, the proportion of resistant bacteria in the population increases.",
          "Antibiotics should only be prescribed when necessary, patients should complete the full course, and narrow-spectrum antibiotics should be used."
        ]
      },
      {
        heading: "Prevention of infectious diseases",
        points: [
          "Personal hygiene: wash hands, cover the mouth and nose when coughing or sneezing.",
          "Public hygiene: isolate patients, disinfect, drink boiled water, and eliminate stagnant water.",
          "Vaccination is a preventive measure and is a form of artificial active immunity."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Explain why increasing the use of antibiotics causes the percentage of resistant bacteria in a population to rise. (Concept from 2007 CE Q7b)",
        marks: "5 marks",
        answer: "There is genetic variation within a bacterial population; some bacteria are resistant to the antibiotic.\nIncreasing the use of antibiotics kills the non-resistant bacteria, while the resistant bacteria continue to survive.\nThe resistant bacteria keep reproducing, producing offspring with the same characteristics.\nCompetition among the population for nutrients and other resources is reduced, so the number of resistant bacteria increases faster.\nTherefore the percentage of resistant bacteria in the population rises."
      },
      {
        q: "State two serious consequences that may be caused by the misuse of antibiotics.",
        marks: "4 marks",
        answer: "Bacteria resistant to many antibiotics (superbugs) may appear, and the diseases caused by superbugs may be incurable, threatening human health.\nAntibiotics destroy beneficial bacteria together with pathogenic bacteria, reducing the competition for resources faced by pathogenic bacteria and promoting their growth.\nNew antibiotics or other drugs are needed to replace those that have become ineffective, and developing new drugs requires more money and manpower."
      }
    ]
  },
  {
    no: 24,
    name: "Non-infectious Diseases and Prevention of Diseases",
    sections: [
      {
        heading: "Cancer",
        points: [
          "Mutations occur in the DNA related to cell division, causing cells to divide uncontrollably and continuously, forming tumours.",
          "Benign tumours are surrounded by connective tissue and remain at the site where they grow; malignant tumours can spread through the bloodstream or lymphatic system and invade other tissues (metastasis).",
          "Risk factors: smoking, drinking alcohol, high-fat low-fibre diets, exposure to carcinogens/ionising radiation/ultraviolet light, infection with certain viruses or bacteria, heredity and old age.",
          "Treatments: surgical removal, chemotherapy and radiotherapy."
        ]
      },
      {
        heading: "Cardiovascular diseases",
        points: [
          "Atherosclerosis: cholesterol accumulates on the inner wall of arteries to form atheromatous plaques, narrowing the lumen and hardening the wall.",
          "Coronary heart disease: the coronary arteries are narrowed or blocked, so the blood supply to the heart muscle is insufficient and the heart muscle may die.",
          "Stroke: the cerebral arteries are blocked or rupture, and brain cells die from lack of oxygen.",
          "Risk factors: high-fat diet, smoking, lack of exercise, high blood pressure, diabetes, heredity and ageing.",
          "Treatments: balloon angioplasty (stent) and coronary bypass surgery.",
          "Effects of smoking: nicotine constricts the blood vessels, stimulates the heart rate and increases platelet stickiness; carbon monoxide reduces the oxygen-carrying capacity of the blood."
        ]
      },
      {
        heading: "Diabetes mellitus",
        points: [
          "Type I: the β cells of the pancreas are destroyed by the immune system, so no or very little insulin can be made; it usually develops at a young age and requires insulin injection.",
          "Type II: target cells (liver, muscle) are unresponsive to insulin; it is related to obesity, overeating and lack of exercise; it is controlled by diet and exercise.",
          "Symptoms: frequent urination, thirst, tiredness and hunger; long-term high blood glucose can damage nerves and blood vessels."
        ]
      },
      {
        heading: "Prevention and a healthy lifestyle",
        points: [
          "A healthy diet: eat more fruit and vegetables, reduce intake of saturated fat and salt.",
          "Regular exercise strengthens the heart and lungs, controls body weight and relieves stress.",
          "Health screening helps detect diseases early before symptoms appear.",
          "Avoid smoking, excessive drinking and overexposure to ultraviolet light."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Mr Chan has smoked for more than 25 years and suffers chest pain during vigorous exercise. The doctor advises him to quit smoking and eat a low-fat diet. Give one reason for each piece of advice. (Condensed from 2012 PP 1B Q7)",
        marks: "4 marks",
        answer: "Quitting smoking: the carbon monoxide produced when cigarettes burn reduces the oxygen-carrying capacity of the blood, so quitting smoking can increase the oxygen content of the blood; or nicotine constricts the blood vessels, increasing the workload of the heart.\nLow-fat diet: a low-fat diet reduces the deposition of fatty substances on the inner wall of the coronary arteries, reducing the risk of atherosclerosis."
      },
      {
        q: "Explain why coronary heart disease is a leading killer in high-income countries; and give one way in which a lifestyle factor is related to coronary heart disease. (Condensed from 2018 DSE 1B Q4)",
        marks: "5 marks",
        answer: "People in high-income countries often eat high-calorie/high-fat food and lack exercise.\nThis increases the formation of cholesterol plaques/fat deposition in the coronary arteries.\nThe arterial lumen becomes narrower and blood flow decreases.\nThe heart muscle does not receive enough nutrients and oxygen.\nThis leads to heart disease (coronary heart disease)."
      }
    ]
  },
  {
    no: 25,
    name: "Body Defence Mechanisms",
    sections: [
      {
        heading: "Non-specific defence mechanisms",
        points: [
          "Physical barriers: the skin, and the mucus membranes of the respiratory tract (mucus + cilia).",
          "Chemical barriers: gastric acid, lysozyme in tears.",
          "Blood clotting: fibrinogen is converted into insoluble fibrin, forming a network that traps blood cells and pathogens.",
          "Phagocytosis: phagocytes engulf and digest pathogens.",
          "Inflammatory response: the dilation of small arteries makes the tissue red; the increased permeability of the capillary walls makes the tissue swell; and the tissue fluid pressing on the nerve endings produces pain."
        ]
      },
      {
        heading: "Specific defence mechanisms (immunity)",
        points: [
          "Humoral immunity (B cells): after B cells combine with antigens and are stimulated by helper T cells, they differentiate into plasma cells (producing antibodies) and memory B cells.",
          "Cell-mediated immunity (T cells): helper T cells are activated and secrete lymphokines, stimulating killer T cells to destroy infected cells.",
          "Functions of antibodies: lysing pathogens, coating antigens to promote phagocytosis, clumping pathogens together, and neutralising toxins (antitoxins).",
          "The primary response is slow and small; the secondary response is fast and large (due to memory cells)."
        ]
      },
      {
        heading: "Active immunity and passive immunity",
        points: [
          "Active immunity: antibodies are made by the body's own immune system, and the immunity is long-lasting; natural (recovery from illness), artificial (vaccination).",
          "Passive immunity: antibodies are introduced from outside, giving immediate but short-lived immunity; natural (from the mother through the placenta/breast milk), artificial (injection of serum).",
          "A vaccine introduces antigens, stimulating the body to produce antibodies and memory cells; it is a form of artificial active immunity."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Explain why children who have been vaccinated are better protected than children who have not been vaccinated. (Condensed from 2013 DSE 1B Q9)",
        marks: "4 marks",
        answer: "The vaccine contains antigens.\nThese antigens stimulate the immune system to produce memory cells related to them.\nOn second contact with the same antigen, the memory cells are capable of producing large amounts of antibodies.\nTherefore children who have been vaccinated usually have a higher level of antibodies and are better protected."
      },
      {
        q: "Explain why tissues with an inflammatory response often show the symptoms of redness, swelling and pain. (Condensed from 2016 DSE 1B Q7)",
        marks: "4 marks",
        answer: "During an inflammatory response, the small arteries of the tissue dilate, increasing blood flow to the tissue and making it red.\nThe permeability of the capillary walls increases, increasing the formation and accumulation of tissue fluid, making it swell.\nMore tissue fluid presses on the nerve endings, stimulating the pain receptors.\nTherefore a feeling of pain is produced."
      }
    ]
  },
  {
    no: 26,
    name: "Basic Genetics",
    sections: [
      {
        heading: "DNA, chromosomes and genes",
        points: [
          "DNA has a double-stranded structure, with a backbone of phosphate groups and deoxyribose sugars; the nitrogenous bases lie inside the structure, joined by hydrogen bonds (complementary base pairing A–T, C–G).",
          "Chromosomes are made of DNA and proteins and carry genetic information; individuals of the same species have the same number of chromosomes in their body cells.",
          "A gene is a short section of DNA on a chromosome; it is the basic unit of heredity, determining one inherited characteristic and producing proteins.",
          "Why DNA is suitable as genetic material: the base sequence forms the genetic code, it can carry a large amount of information, the molecule is stable, and it can be replicated accurately."
        ]
      },
      {
        heading: "Monohybrid inheritance",
        points: [
          "Law of segregation (Mendel's first law): during gamete formation, each pair of alleles separates, and each gamete receives only one of them.",
          "Law of independent assortment (Mendel's second law): during gamete formation, the segregation of alleles of each gene is independent of the segregation of alleles of other genes.",
          "A dominant trait is expressed even in a heterozygous individual; a recessive trait is expressed only in the homozygous state.",
          "Test cross: crossing a dominant individual of unknown genotype with a homozygous recessive individual to determine its genotype.",
          "If all offspring of a homozygous × recessive cross show the dominant trait → the parent is homozygous; if the offspring show a 1:1 ratio → the parent is heterozygous."
        ]
      },
      {
        heading: "Human inheritance: blood groups, sex determination and sex linkage",
        points: [
          "The ABO blood groups are controlled by multiple alleles (Iᴬ, Iᴮ, i); Iᴬ and Iᴮ are codominant.",
          "Type O blood (ii) is the 'universal donor' because its red blood cells have neither antigen A nor antigen B.",
          "Sex is determined by the sex chromosome of the sperm: an X sperm → girl (XX), a Y sperm → boy (XY); the mother provides only an X chromosome.",
          "X-linked recessive inherited diseases (e.g. red-green colour blindness, haemophilia) are more common in males; a father does not pass an X-linked gene to his sons.",
          "The X chromosome is longer than the Y chromosome and carries more genes."
        ]
      },
      {
        heading: "Genetic variation",
        points: [
          "Factors causing genetic variation: independent assortment of chromosomes, crossing over during meiosis, random fertilisation, and mutation.",
          "A mutation can only be inherited by offspring if it occurs in a gamete or in a cell that produces gametes.",
          "Environmental factors (temperature, diet) also affect the expression of some genes."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Explain why the sex of offspring is not mainly determined by the mother. (Condensed from 2018 DSE 1B Q5)",
        marks: "3 marks",
        answer: "The mother produces only one type of egg, carrying one X chromosome.\nThe father produces two types of sperm, one carrying an X chromosome and the other carrying a Y chromosome.\nThe sex of the offspring depends on which type of sperm is involved in fertilisation.\nTherefore the sex is not determined by the mother."
      },
      {
        q: "Maggie's father is red-green colour blind, while Maggie has normal vision. Without using a genetic diagram, deduce Maggie's genotype. (Condensed from 2013 DSE 1B Q4)",
        marks: "4 marks",
        answer: "Because Maggie's father is colour blind, his X chromosome must carry the recessive allele for red-green colour blindness.\nMaggie is female, so she should inherit the X chromosome carrying that recessive allele from her father.\nOn the other hand, Maggie has normal vision, so she should have an X chromosome carrying the dominant allele for normal vision.\nTherefore Maggie is a heterozygote (carrier)."
      }
    ]
  },
  {
    no: 27,
    name: "Molecular Genetics",
    sections: [
      {
        heading: "DNA replication, transcription and translation",
        points: [
          "DNA replication (in the nucleus, semiconservative): the hydrogen bonds break and the two strands separate; each strand acts as a template; free nucleotides pair up by complementary base pairing; DNA polymerase catalyses the formation of the new strands.",
          "Transcription (in the nucleus): one strand of the DNA acts as a template and RNA polymerase synthesises mRNA; the mRNA leaves the nucleus and enters the cytoplasm.",
          "Translation (on the ribosomes in the cytoplasm): tRNA carries amino acids, anticodons pair complementarily with mRNA codons, adjacent amino acids form peptide bonds, synthesising a polypeptide.",
          "Features of the genetic code: triplet code, degenerate code (several codons code for the same amino acid), no overlap between codons, and universality (almost all organisms share it).",
          "One gene – one polypeptide: the base sequence of a gene determines the amino acid sequence of a polypeptide."
        ]
      },
      {
        heading: "Gene mutations",
        points: [
          "Gene mutations change the base sequence of DNA: substitution, inversion, deletion and insertion.",
          "Substitution usually changes only one codon, with a small or no effect; deletion/insertion cause frameshift mutations, shifting the reading frame, so the protein usually cannot function normally.",
          "Example: sickle-cell anaemia is caused by the substitution of base T by A in the gene for the β-chain of haemoglobin.",
          "Causes of mutation: spontaneous mutations (errors in DNA replication) or induced mutations (mutagens such as tar, nitrites, PAH).",
          "Mutations in germ cells can be passed on to the next generation; mutations in body cells cannot."
        ]
      },
      {
        heading: "Chromosomal mutations",
        points: [
          "Structural changes: deletion, duplication, inversion and translocation.",
          "Changes in number: during meiosis, homologous chromosomes or sister chromatids fail to separate, forming aneuploids.",
          "Down syndrome: an extra copy (three copies) of chromosome 21, caused by the failure of the pair of homologous chromosomes 21 to separate during meiosis."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Describe the process from the DNA base sequence to protein synthesis (transcription and translation).",
        marks: "6 marks",
        answer: "Transcription occurs in the nucleus: the DNA double helix unwinds and one strand becomes the template for synthesising mRNA.\nCatalysed by RNA polymerase, free RNA nucleotides join according to the complementary sequence of the template, forming mRNA.\nThe mRNA leaves the nucleus, enters the cytoplasm and attaches to a ribosome.\nTranslation occurs on the ribosome: tRNA molecules carry specific amino acids.\nThe anticodon of the tRNA pairs complementarily with the codon of the mRNA.\nPeptide bonds form between adjacent amino acids to form a polypeptide; when a stop codon is reached, the polypeptide is released and folds into a protein."
      },
      {
        q: "Explain why a gene mutation in mitochondrial DNA can affect oxidative phosphorylation. (Condensed from 2018 DSE 1B Q9(a))",
        marks: "4 marks",
        answer: "A gene mutation involves a change in the nucleotide/base sequence of a single gene.\nThe polypeptide produced by the mutant gene has a different amino acid sequence.\nThe polypeptide folds into an enzyme with a different shape/three-dimensional conformation/active site.\nThis enzyme loses its function in oxidative phosphorylation and cannot produce a functional enzyme."
      }
    ]
  },
  {
    no: 28,
    name: "Biotechnology",
    sections: [
      {
        heading: "Recombinant DNA technology",
        points: [
          "Recombinant DNA technology is the technique of combining DNA from different sources into a single molecule.",
          "Steps: obtain the DNA fragment carrying the target gene from the donor cells → cut the DNA fragment and the plasmid with the same restriction enzyme → insert the target gene into the plasmid, and DNA ligase joins the two (ligation) → forming a recombinant plasmid.",
          "Restriction enzymes are 'molecular scissors' that cut DNA after recognising specific base sequences; DNA ligase is 'molecular glue'.",
          "Plasmids usually come from bacteria and are used as vectors to carry the target gene into host cells.",
          "Antibiotic resistance genes are used to select bacteria that have been successfully transformed."
        ]
      },
      {
        heading: "Applications of genetic engineering",
        points: [
          "Medicine: producing human insulin, gene therapy for inherited diseases.",
          "Agriculture and food industry: improving the yield and quality of crops and livestock, genetically modified food.",
          "Mining industry: producing genetically modified bacteria that can efficiently extract metals.",
          "Cleaning up oil spills: enhancing the efficiency of bacteria that break down petroleum."
        ]
      },
      {
        heading: "DNA fingerprinting and gel electrophoresis",
        points: [
          "The lengths of the highly variable regions of DNA differ between individuals (except identical twins) and are used for identification.",
          "Steps: extract DNA → use restriction enzymes to obtain fragments containing the highly variable regions → separate by gel electrophoresis → stain to show the bands (DNA fingerprint).",
          "Gel electrophoresis separates by molecular size: DNA is negatively charged and moves towards the anode, and smaller fragments move faster.",
          "Applications: forensic science, paternity testing, identifying disaster victims, deducing evolutionary relationships."
        ]
      },
      {
        heading: "Human Genome Project",
        points: [
          "Aims: to determine the base sequence of human DNA, to identify all the genes and their locations (gene mapping), and to store the data in databases.",
          "Benefits: developing new diagnostic tests and treatments, assessing the risk of mutagens, boosting agricultural productivity, and finding evolutionary relationships."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Describe the main steps of producing human insulin using recombinant DNA technology.",
        marks: "6 marks",
        answer: "Obtain the DNA fragment carrying the human insulin gene from human cells.\nCut the target gene and the bacterial plasmid with the same restriction enzyme to produce the same sticky ends.\nInsert the target gene into the cut plasmid.\nUse DNA ligase to join the target gene and the plasmid, forming a recombinant plasmid.\nIntroduce the recombinant plasmid into bacteria (e.g. Escherichia coli).\nCulture the bacteria so that they produce human insulin in large quantities, then extract and purify it."
      },
      {
        q: "Explain how gel electrophoresis separates DNA fragments, and state two applications of DNA fingerprinting.",
        marks: "5 marks",
        answer: "DNA fragments are placed at the cathode end of the gel plate.\nSince DNA contains phosphate groups, it is negatively charged and moves towards the anode under the electric field.\nSmaller DNA fragments pass through the gel more easily and move faster than larger fragments.\nAfter some time, the DNA fragments are separated by molecular size and, after adding a stain, bands can be seen.\nApplications: providing evidence in forensic science, paternity testing, identifying victims of disasters, deducing evolutionary relationships (any two)."
      }
    ]
  },
  {
    no: 29,
    name: "Biodiversity",
    sections: [
      {
        heading: "Classification and naming",
        points: [
          "Seven levels: kingdom → phylum → class → order → family → genus → species.",
          "Organisms of the same species can interbreed to produce fertile offspring.",
          "Binomial nomenclature: the scientific name includes the genus name + species name.",
          "The levels of classification are arranged from large to small: kingdom, phylum, class, order, family, genus, species."
        ]
      },
      {
        heading: "Three-domain six-kingdom system",
        points: [
          "Three domains: Bacteria, Archaea and Eukarya.",
          "Six kingdoms: Eubacteria, Archaebacteria, Protista, Fungi, Plantae and Animalia.",
          "Eubacteria: genetic material is a circular DNA molecule lying free in the cytoplasm, and the cell wall is made of peptidoglycan.",
          "Archaebacteria: the cell wall composition differs from that of bacteria, and they can survive in extreme environments (high temperature, high pressure, high salinity, extreme pH)."
        ]
      },
      {
        heading: "Classification of plants and dichotomous keys",
        points: [
          "Plants with vascular tissue (ferns, conifers, flowering plants) have woody tissue for support and can grow taller.",
          "Plants without vascular tissue (e.g. mosses) live in moist habitats and have no cuticle to prevent water loss.",
          "Dichotomous key: a series of steps, each providing two contrasting characteristics, to identify an organism by making choices step by step."
        ]
      },
      {
        heading: "Conservation and human impacts",
        points: [
          "Biodiversity includes species diversity, genetic diversity and ecosystem diversity.",
          "Habitat destruction reduces species; high genetic diversity increases the ability of a population to adapt to environmental changes.",
          "Protecting natural habitats (e.g. country parks, marine parks) is the most fundamental conservation method.",
          "Invasive alien species compete with native species and threaten local ecosystems."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Compare plant X (moss) and plant Y (flowering plant) in terms of vascular tissue, and explain why plant Y can grow taller. (Condensed from 2009 CE Q9b)",
        marks: "5 marks",
        answer: "Plant X (moss) has no vascular bundle; plant Y has vascular bundles (containing xylem).\nThe vascular bundles contain xylem tissue/thick-walled cells, providing better support for the plant.\nTherefore plant Y can grow taller.\nThe xylem can also transport water to higher positions.\nMosses grow in moist environments because they have no cuticle to prevent water loss and no vascular bundles to transport water."
      },
      {
        q: "Explain why a dichotomous key cannot be used to deduce the evolutionary relationships among organisms. (Condensed from 2016 DSE 1B Q4)",
        marks: "3 marks",
        answer: "A dichotomous key identifies a group of organisms according to observable external morphological characteristics.\nThese morphological characteristics are not necessarily related to evolutionary/phylogenetic relationships.\nTherefore evolutionary relationships cannot be deduced from a key alone."
      }
    ]
  },
  {
    no: 30,
    name: "Origin of Life and Evidence of Evolution",
    sections: [
      {
        heading: "Origin of life",
        points: [
          "The Miller experiment simulated the early Earth's atmosphere (methane, ammonia, hydrogen, water vapour) and produced organic molecules such as amino acids.",
          "Scientists believe that inorganic substances in the primordial atmosphere interacted to first form organic molecules, which then combined to form the most primitive organisms.",
          "Pasteur's swan-neck flask experiment proved that life can only come from pre-existing life (biogenesis), refuting the theory of spontaneous generation."
        ]
      },
      {
        heading: "Evidence of evolution: fossils",
        points: [
          "Studying fossils reveals the era/order of existence of organisms: fossils in older rock strata have simpler structures, showing that organisms change over time.",
          "Limitations of the fossil record: there are gaps; organisms with soft bodies cannot form fossils; environments may be unsuitable for fossil formation; fossils may be destroyed by natural changes; and they may be hidden in places that are hard to explore."
        ]
      },
      {
        heading: "Other evidence of evolution",
        points: [
          "Comparative anatomy: homologous structures (same origin but possibly different functions), e.g. the wing of a bat and the human arm, show a common ancestor.",
          "Comparative embryology: embryos of different species are similar in the early stages of development, showing a common ancestor.",
          "Comparative molecular biology: the more similar the DNA base sequences or protein amino acid sequences, the closer the evolutionary relationship.",
          "Vestigial organs (e.g. the human appendix) are also evidence of evolution."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Explain why the smaller the number of amino acid differences between organisms, the closer their evolutionary relationship.",
        marks: "4 marks",
        answer: "The amino acid sequence of a polypeptide depends on the DNA base sequence.\nDifferences in amino acid sequences result from mutations in the DNA base sequence.\nOrganisms with closer evolutionary relationships have more similar DNA base sequences.\nTherefore their polypeptides have fewer amino acid differences."
      },
      {
        q: "Describe the limitations of the fossil record, and explain why fossils cannot give a complete record of the evolutionary history of organisms.",
        marks: "4 marks",
        answer: "There are gaps in the fossil record; not every species has fossils.\nSome organisms have soft bodies and cannot form fossils.\nThe environments where the remains of some organisms are found are unsuitable for fossil formation.\nFossils may be destroyed by natural changes, or lie in places that are hard for humans to explore."
      }
    ]
  },
  {
    no: 31,
    name: "Mechanisms of Evolution and Speciation",
    sections: [
      {
        heading: "Natural selection",
        points: [
          "Key concepts of Darwin's theory of natural selection: overproduction, the population size is roughly stable, variation exists among individuals, competition for survival, survival of the fittest, and advantageous characteristics are inherited by offspring.",
          "Natural selection acts directly on the phenotype of individuals; over many generations, the proportion of advantageous characteristics in the population increases.",
          "Examples of natural selection: industrial melanism (dark-coloured moths), antibiotic-resistant bacteria, sickle-cell anaemia.",
          "The error of Lamarck's theory: acquired characteristics cannot be inherited by offspring."
        ]
      },
      {
        heading: "Sources of genetic variation",
        points: [
          "Gene mutations provide new alleles and are the raw material of evolution.",
          "Independent assortment and crossing over of homologous chromosomes during meiosis, and random fertilisation, produce gametes and zygotes with different gene combinations.",
          "Gene flow: genes flow between populations through the migration of individuals.",
          "Genetic drift: random fluctuations in gene frequencies within a population."
        ]
      },
      {
        heading: "Speciation",
        points: [
          "Definition of species: a group that can interbreed naturally and produce fertile offspring.",
          "Geographical isolation prevents interbreeding and gene flow between populations; different groups face different environments and accumulate different advantageous variations.",
          "When the accumulated variation is such that the groups can no longer interbreed, or interbreeding cannot produce fertile offspring, different species are formed (reproductive isolation).",
          "Antibiotic-resistant bacteria: mutations produce resistance genes, and antibiotics select the bacteria that were already resistant."
        ]
      }
    ],
    longQuestions: [
      {
        q: "According to the modern understanding of evolution, explain in detail Darwin's view on how giraffes evolved long necks. (Condensed from 2018 DSE 1B Q10)",
        marks: "4 marks",
        answer: "Genetic variation exists in the giraffe population; some are long-necked and others short-necked.\nLong-necked individuals can obtain food more effectively than short-necked individuals, getting more food.\nLong-necked individuals have a higher chance of surviving and reproducing.\nTherefore, over several generations, the proportion of long-necked individuals in the population gradually increases."
      },
      {
        q: "Explain why bacteria develop resistance to antibiotics.",
        marks: "5 marks",
        answer: "Genetic variation exists within a bacterial population; some bacteria are resistant to antibiotics because of mutation.\nThe use of antibiotics kills the non-resistant bacteria.\nResistant bacteria are better adapted in an environment containing antibiotics and have a higher chance of survival.\nThey have a greater chance of reproducing and passing the advantageous characteristic (the resistance gene) to their offspring.\nAfter several generations, the proportion of resistant bacteria rises and the antibiotics gradually become ineffective."
      }
    ]
  },
  {
    no: 32,
    name: "Regulation of Body Temperature",
    sections: [
      {
        heading: "Pathways of heat transfer",
        points: [
          "Conduction: direct transfer between two objects in contact (e.g. the body loses heat when touching a cold object).",
          "Convection: transfer between an object and moving water or air (e.g. wind blowing across the skin causing heat loss).",
          "Radiation: transfer between objects not in direct contact as infrared radiation (e.g. the sun's radiation heats the body).",
          "Evaporation of sweat: heat is lost when liquid water changes into vapour."
        ]
      },
      {
        heading: "Responses in the cold",
        points: [
          "Thermoreceptors in the hypothalamus detect a fall in blood temperature and stimulate the heat-gain centre to send nerve impulses.",
          "The small arteries of the skin constrict, reducing blood flow through the capillaries near the skin surface and reducing heat loss.",
          "The erector muscles contract to raise the hairs, forming a thicker layer of still air and reducing heat loss by conduction and convection.",
          "The sweat glands reduce sweating.",
          "The skeletal muscles shiver, producing more heat.",
          "Long-term response: the secretion of thyroxine increases, raising the metabolic rate of the cells to produce more heat."
        ]
      },
      {
        heading: "Responses in hot conditions",
        points: [
          "The hypothalamus stimulates the heat-loss centre to send nerve impulses.",
          "The small arteries of the skin dilate, so more blood flows through the skin surface, losing more heat.",
          "The erector muscles relax so the hairs lie flat and the still-air layer becomes thinner.",
          "The sweat glands increase sweating, and the evaporation of sweat removes heat energy.",
          "In humid weather, sweat evaporates slowly and the efficiency of heat loss is low, so people feel hotter."
        ]
      },
      {
        heading: "Heat stroke",
        points: [
          "Causes of heat stroke: evaporation of sweat cannot effectively remove heat (low wind speed, high humidity, dehydration preventing sweating); convection and radiation of heat are obstructed; and when the environmental temperature is higher than body temperature, the body gains heat from the environment.",
          "Temperature regulation is a negative feedback mechanism; the thermoregulatory centre is located in the hypothalamus."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Explain why the blood flow to the skin increases during exercise. (Condensed from 2015 HKDSE P2 1b(iii))",
        marks: "4 marks",
        answer: "Muscle contraction produces heat.\nThe thermoreceptors in the hypothalamus/skin detect the rise in body temperature.\nThe heat-loss centre of the hypothalamus is stimulated and sends nerve impulses.\nThis causes the small arteries near the skin surface to dilate, increasing the blood flow near the skin surface to promote heat loss."
      },
      {
        q: "Explain why, in hot and humid weather, the efficiency of heat loss in the human body decreases and the perceived temperature is higher. (Condensed from 2018 HKDSE P2 1b)",
        marks: "4 marks",
        answer: "Higher relative humidity hinders the evaporation of sweat.\nAs a result, heat cannot be effectively lost to the surroundings through the evaporation of sweat.\nTherefore a feeling of higher temperature is produced.\nAt higher temperatures, the gradient between body temperature and air temperature narrows, so the efficiency of heat loss by conduction/convection/radiation is also lower."
      }
    ]
  },
  {
    no: 33,
    name: "Regulation of Water Content",
    sections: [
      {
        heading: "Urinary system and nephrons",
        points: [
          "Urinary system: a pair of kidneys, two ureters, one urinary bladder and one urethra.",
          "Pathway of urine: kidney → ureter → bladder (controlled by the sphincter) → urethra.",
          "A nephron consists of the Bowman's capsule and the renal tubule (proximal convoluted tubule, loop of Henle, distal convoluted tubule, collecting duct)."
        ]
      },
      {
        heading: "Formation of urine: ultrafiltration and reabsorption",
        points: [
          "Ultrafiltration occurs in the glomerulus: the pumping pressure of the heart keeps the blood in the glomerulus at a high hydrostatic pressure, so water and small molecules (glucose, amino acids, salts, urea) are squeezed out of the blood vessels into the Bowman's capsule, forming the glomerular filtrate.",
          "The glomerular filtrate does not contain plasma proteins or blood cells (they are too large to pass through).",
          "Reabsorption: more than 99% of the filtrate is reabsorbed; glucose, amino acids and most salts are reabsorbed in the proximal convoluted tubule by diffusion and active transport; water is reabsorbed by osmosis; some urea diffuses back into the blood.",
          "Glucose is completely reabsorbed by active transport; urea is reabsorbed only by diffusion, and only about half of it is reabsorbed."
        ]
      },
      {
        heading: "ADH and the regulation of water content",
        points: [
          "When the body lacks water, the water potential of the blood falls: the osmoreceptors in the hypothalamus detect this and stimulate the pituitary to release more ADH.",
          "ADH increases the permeability of the wall of the collecting duct to water, so a larger proportion of water is reabsorbed, forming a small amount of concentrated urine.",
          "After drinking a lot of water, the water potential of the blood rises: less ADH is released, the permeability of the collecting duct falls, forming a large amount of dilute urine.",
          "Alcohol/caffeine inhibit the release of ADH by the pituitary, leading to frequent urination."
        ]
      },
      {
        heading: "Other functions of the kidneys and kidney diseases",
        points: [
          "The kidneys regulate the balance of water and salts in the body and excrete nitrogenous waste (urea, from the deamination of amino acids in the liver).",
          "Glucose in the urine → blood glucose too high (diabetes) or insufficient reabsorption; protein in the urine → damage to the glomeruli.",
          "Kidney dialysis uses a semipermeable membrane to remove waste from the blood by diffusion."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Explain why urine output increases after drinking a large amount of plain water.",
        marks: "5 marks",
        answer: "After drinking a lot of water, the water potential of the blood rises.\nThe osmoreceptors in the hypothalamus detect the rise in the water potential of the blood.\nThe pituitary is stimulated to release less ADH.\nSince the level of ADH in the blood falls, the permeability of the wall of the collecting duct to water decreases.\nA smaller proportion of the water is reabsorbed into the blood, forming a large amount of dilute urine to remove the excess water."
      },
      {
        q: "Explain why diabetic patients urinate more frequently than healthy people. (Condensed from 2016 HKDSE P2 Q1b)",
        marks: "4 marks",
        answer: "The patients cannot reabsorb all the glucose from the glomerular filtrate, so some glucose remains in the filtrate in the renal tubules.\nTherefore, compared with healthy people, the glomerular filtrate has a lower water potential.\nAs a result, the collecting duct can reabsorb only a smaller proportion of the water.\nThe patients produce a large amount of urine and need to urinate more frequently."
      }
    ]
  },
  {
    no: 34,
    name: "Regulation of Gas Content in the Blood",
    sections: [
      {
        heading: "Control of breathing",
        points: [
          "Breathing is controlled voluntarily by the cerebrum and involuntarily by the medulla oblongata; the medulla sets the basic rhythm of breathing and regulates the rate and depth of breathing.",
          "During exercise, the muscles release a lot of carbon dioxide, lowering the pH of the blood and stimulating the chemoreceptors in the carotid bodies and aortic bodies.",
          "A fall in the pH of the cerebrospinal fluid also stimulates the chemoreceptors in the respiratory centre of the medulla.",
          "The medulla sends nerve impulses more frequently to the intercostal muscles and the diaphragm, increasing the rate and depth of breathing.",
          "Breathing is mainly regulated by the carbon dioxide concentration in the blood, not the oxygen concentration."
        ]
      },
      {
        heading: "Pacemaker and the cardiac cycle",
        points: [
          "The sinoatrial node (pacemaker) sends out electrical impulses that spread through the walls of the atria, causing the atria to contract.",
          "The electrical impulses pass to the atrioventricular node and then to the walls of the ventricles, starting ventricular contraction.",
          "Cardiac cycle: atrial contraction → ventricular contraction → relaxation of the atria and ventricles.",
          "During ventricular contraction, the pressure in the ventricles is higher than in the aorta and pulmonary artery, so the semilunar valves open; during ventricular relaxation, the semilunar valves close (producing the heart sounds)."
        ]
      },
      {
        heading: "Control of cardiac output",
        points: [
          "Nervous control: during exercise (a fall in blood pH or blood pressure) the cardio-acceleratory centre of the cardiovascular centre is stimulated, and through the sympathetic nerves the heart muscle contracts faster and more strongly, so cardiac output rises; at rest the opposite occurs, slowing the heart through the vagus nerve.",
          "Hormonal control: in emergencies, the sympathetic nerves stimulate the adrenal glands to secrete adrenaline, making the heart muscle contract faster and more strongly.",
          "During exercise, cardiac output increases, promoting the transport of oxygen to the skeletal muscles and speeding up the removal of carbon dioxide.",
          "After exercise, breathing remains higher, providing extra oxygen to break down lactate (repaying the oxygen debt)."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Explain how an increase in the carbon dioxide concentration in the blood increases the rate and depth of breathing. (Condensed from 2017 HKDSE P2 1a)",
        marks: "5 marks",
        answer: "The body cells continuously carry out respiration, producing carbon dioxide, and more is produced during exercise.\nThe accumulation of carbon dioxide in the blood lowers the pH of the blood/cerebrospinal fluid.\nThe chemoreceptors in the carotid bodies, aortic bodies and medulla detect the high concentration of carbon dioxide.\nThese receptors send nerve impulses to stimulate the respiratory centre of the medulla.\nThe medulla sends more nerve impulses to the respiratory muscles (intercostal muscles and diaphragm muscles), making the muscles contract faster and more strongly, so the rate and depth of breathing increase."
      },
      {
        q: "Explain why a marathon runner cannot run the whole distance at the average speed of a 100-metre runner. (Condensed from 2014 HKDSE P2 1b)",
        marks: "5 marks",
        answer: "A marathon runner has to run a much longer distance than a 100-metre runner, so the muscles have to contract continuously for a much longer time.\nIf the marathon were run at the speed of a 100-metre race, the oxygen supplied to the muscles would be insufficient.\nThe muscles would carry out anaerobic respiration and produce lactate.\nLactate would accumulate in the muscles.\nThis causes muscle fatigue, and the muscles can no longer contract."
      }
    ]
  },
  {
    no: 35,
    name: "Hormonal Control of the Reproductive Cycle",
    sections: [
      {
        heading: "Hormones of the menstrual cycle",
        points: [
          "The four main hormones: follicle-stimulating hormone (FSH), luteinising hormone (LH), oestrogen and progesterone.",
          "FSH (pituitary) stimulates the development of follicles and stimulates the follicles to secrete oestrogen; LH (pituitary) stimulates ovulation.",
          "Oestrogen (from the developing follicle) stimulates the thickening of the uterine lining; progesterone (from the corpus luteum) maintains the thickness of the uterine lining."
        ]
      },
      {
        heading: "The three phases of the menstrual cycle",
        points: [
          "Before ovulation (days 1–13): low levels of oestrogen and progesterone cause menstruation; FSH stimulates the development of follicles; the follicles secrete oestrogen, thickening the lining.",
          "Ovulation (day 14): the peak of oestrogen stimulates a surge of LH (positive feedback), and the high LH stimulates ovulation.",
          "After ovulation (days 15–28): the corpus luteum secretes oestrogen and progesterone; progesterone maintains the lining and increases its blood supply, preparing for the implantation of the embryo; the high oestrogen and progesterone inhibit FSH and LH, preventing the development of another follicle."
        ]
      },
      {
        heading: "Fertilisation and no fertilisation",
        points: [
          "No fertilisation: the corpus luteum degenerates, oestrogen and progesterone fall, the lining sheds → menstruation; the pituitary secretes FSH again and the cycle restarts.",
          "Fertilisation: the embryo secretes human chorionic gonadotrophin (HCG), preventing the degeneration of the corpus luteum; the corpus luteum continues to secrete oestrogen and progesterone to maintain the lining, and the placenta later takes over."
        ]
      },
      {
        heading: "Hormonal contraception and treatment of infertility",
        points: [
          "Contraceptive pills contain synthetic oestrogen and progesterone, maintaining high levels to inhibit the secretion of FSH and LH → no follicular development and no ovulation.",
          "Emergency contraceptive pills: a high dose of progesterone prevents/delays ovulation, thickens the cervical mucus, and reduces the thickness of the lining to prevent implantation.",
          "Treatment of infertility: synthetic FSH/LH stimulate follicular development and ovulation; oestrogen and progesterone stimulate the thickening of the lining; FSH is used in in-vitro fertilisation (IVF) to collect many eggs."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Explain how the progesterone in contraceptive pills helps a woman avoid pregnancy. (Condensed from 2013 HKDSE P2 Q1b)",
        marks: "5 marks",
        answer: "The high level of progesterone inhibits the secretion of FSH and LH by the pituitary.\nThe lower level of FSH is insufficient to stimulate the development of follicles.\nThe lower level of LH is insufficient to stimulate ovulation.\nTherefore no egg is released.\nNo egg meets the sperm, so fertilisation does not occur."
      },
      {
        q: "To investigate the relationship between oestrogen and FSH, a group of women receive extra injections of oestrogen. Explain the effect of oestrogen on FSH, and state the function of the oestrogen in contraceptive pills. (Condensed from 2019 HKDSE P2 Q1a)",
        marks: "6 marks",
        answer: "During the period of oestrogen injection, FSH remains at a low level.\nAfter stopping the oestrogen injection, the FSH level rises again.\nThis shows that oestrogen has a negative feedback effect on the FSH level / inhibits the production or secretion of FSH.\nThe oestrogen in contraceptive pills inhibits the production of FSH.\nTherefore no follicles grow.\nHence there is no mature egg for ovulation / no ovulation."
      }
    ]
  },
  {
    no: 36,
    name: "Human Impacts on the Environment",
    sections: [
      {
        heading: "Population growth and resources",
        points: [
          "Rapid population growth brings: consumption of natural resources, and environmental degradation (habitat destruction and pollution).",
          "Renewable resources can be continuously produced by natural processes; non-renewable resources are limited in supply (e.g. coal, oil)."
        ]
      },
      {
        heading: "Impacts of fishing and agriculture",
        points: [
          "Overfishing: marine fish are killed faster than they can grow, reducing biodiversity.",
          "Destructive fishing (drift nets, trawling, cyanide, fish bombs) harms non-target species and destroys habitats (e.g. coral reefs).",
          "Intensive farming, overgrazing, heavy use of pesticides and chemical fertilisers, and rearing livestock with hormones and antibiotics.",
          "Soil erosion, pesticides harmful to non-target organisms, and toxic chemicals becoming concentrated along food chains (biomagnification, e.g. DDT — the higher the trophic level, the higher the concentration).",
          "Chemical fertilisers leached away cause eutrophication and excessive growth of algae: algae block sunlight and consume oxygen at night, so aquatic organisms die from lack of oxygen."
        ]
      },
      {
        heading: "Land development, land reclamation and pollution",
        points: [
          "Land development: clearing rural vegetation causes habitat destruction and habitat fragmentation.",
          "Land reclamation: increases suspended silt particles, clogging fish gills, reducing sunlight penetration, and the silt may contain toxic substances.",
          "Air pollution: carbon monoxide (combines with haemoglobin, reducing oxygen-carrying capacity), sulphur dioxide, nitrogen oxides, suspended particulates.",
          "Sources of water pollution: domestic sewage (pathogens), industrial effluent (toxic chemicals, heavy metals), oil spills."
        ]
      },
      {
        heading: "Global environmental issues",
        points: [
          "Global warming: greenhouse gases (carbon dioxide, water vapour, methane, etc.) trap the infrared radiation reflected by the Earth, raising the temperature of the atmosphere.",
          "Effects of global warming: rising sea levels, abnormal weather, spread of infectious diseases.",
          "Acid rain: sulphur dioxide and nitrogen oxides dissolve in rainwater to form sulphuric acid and nitric acid; it affects aquatic organisms, damages the cuticle on leaf surfaces, lowers soil pH, and erodes buildings."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Explain how 'eutrophication' leads to the death of fish in the water.",
        marks: "6 marks",
        answer: "Chemical fertilisers are leached into the water, causing the excessive growth of algae.\nThe algae block sunlight, so underwater plants cannot get enough sunlight for photosynthesis and die, lowering the oxygen content of the water.\nAt night, the algae carry out respiration, using up the oxygen in the water.\nWhen the nutrients are used up, the algae die, and bacteria decomposing the large amount of algae further consume the oxygen in the water.\nAquatic organisms (fish) die from lack of oxygen (suffocation)."
      },
      {
        q: "Explain the causes of global warming and two of its effects.",
        marks: "5 marks",
        answer: "Burning fossil fuels releases large amounts of greenhouse gases such as carbon dioxide.\nRadiation from the sun reaches the Earth; after the Earth's surface absorbs it, it reflects heat energy (infrared radiation).\nThe greenhouse gases trap this infrared radiation, so less radiation is emitted into space, raising the temperature of the atmosphere.\nEffect one: icebergs and glaciers melt and the sea level rises, so low-lying areas may be flooded.\nEffect two: abnormal weather — heatwaves, droughts, torrential rain and other natural disasters become more frequent, and the spread of infectious diseases is favoured."
      }
    ]
  },
  {
    no: 37,
    name: "Pollution Control and Conservation",
    sections: [
      {
        heading: "Solid waste and the '4Rs'",
        points: [
          "Reduce: avoid unnecessary consumption of materials and energy.",
          "Reuse: use the same item repeatedly.",
          "Recycle: collect waste materials to manufacture new products.",
          "Replace: substitute non-renewable or harmful resources with alternative resources."
        ]
      },
      {
        heading: "Sewage treatment",
        points: [
          "Primary treatment: screening, grit removal and sedimentation, removing large solids and part of the suspended solids.",
          "Secondary treatment: microorganisms decompose the organic matter in sewage into inorganic compounds (ammonium compounds) in an aerobic environment → nitrification converts them into nitrates → denitrification converts them into nitrogen gas.",
          "Tertiary treatment: removes nutrients and remaining suspended solids, improving water quality.",
          "Sludge treatment: in the absence of oxygen, anaerobic bacteria decompose the organic matter, producing methane that can be used as fuel."
        ]
      },
      {
        heading: "Conservation of biodiversity",
        points: [
          "Biodiversity includes species diversity, genetic diversity and ecosystem diversity.",
          "Reasons for conservation: economic, ecological, aesthetic and ethical.",
          "In-situ conservation: conserving organisms in their natural habitats (e.g. country parks, marine parks, SSSIs, Ramsar wetlands).",
          "Ex-situ conservation: conserving organisms outside their natural habitats (e.g. captive breeding in zoos, seed banks).",
          "CITES (Convention on International Trade in Endangered Species) regulates the international trade of endangered species."
        ]
      },
      {
        heading: "Sustainable development",
        points: [
          "Sustainable development: meeting the needs of the present without compromising the ability of future generations to meet their own needs.",
          "Fisheries: banning destructive fishing, closed fishing seasons, aquaculture, artificial reef programmes.",
          "Agriculture: organic farming (natural fertilisers, biological control), crop rotation to prevent the depletion of soil nutrients.",
          "Individual contributions: reducing waste, supporting recycling, protecting natural habitats."
        ]
      }
    ],
    longQuestions: [
      {
        q: "Describe the processes involved in the primary, secondary and tertiary treatment of sewage.",
        marks: "6 marks",
        answer: "Primary treatment: screening, grit removal and sedimentation, removing large solid waste and part of the suspended solids.\nSecondary treatment: in an aerobic environment, microorganisms decompose the organic matter in the sewage into inorganic compounds (ammonium compounds).\nThe ammonium compounds are converted into nitrates by the nitrification of nitrifying bacteria.\nUnder anaerobic conditions, the nitrates are converted into nitrogen gas by the denitrification of denitrifying bacteria.\nTertiary treatment: physical and biological processes remove nutrients and remaining suspended solids, preventing the excessive growth of algae.\nDisinfection is usually carried out before discharge to kill pathogens."
      },
      {
        q: "Compare 'in-situ conservation' and 'ex-situ conservation', and give one example of each.",
        marks: "4 marks",
        answer: "In-situ conservation is conserving organisms in their natural habitats, e.g. setting up country parks, marine parks and nature reserves.\nAdvantage: organisms live in their natural habitats, preserving the complete ecosystem.\nEx-situ conservation is conserving organisms outside their natural habitats, e.g. captive breeding of endangered species in zoos and setting up seed banks.\nAdvantage: species that are extremely rare and on the verge of extinction in the wild can be protected."
      }
    ]
  }
];
