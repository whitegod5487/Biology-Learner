// frontierTech.en.js
// HKDSE Biology — Frontier technology content (English UK version)
// Loaded when the app language is English (UK). Structure matches frontierTech.js (zh-HK).

const FRONTIER_TECH_EN = [
  {
    title: "Genetic Engineering and Gene Editing (CRISPR-Cas9)",
    subtitle: "Precision molecular scissors rewriting the blueprint of life",
    relatedTopics: [
      { no: 26, name: "Basic Genetics" },
      { no: 27, name: "Molecular Genetics" },
      { no: 28, name: "Biotechnology" }
    ],
    coreConcepts: [
      "A gene is a segment of DNA on a chromosome; its base sequence determines the amino acid sequence of a polypeptide (protein), and hence the characteristics of an organism.",
      "Recombinant DNA technology uses restriction enzymes (molecular scissors) and DNA ligase (molecular glue) to insert the target gene into a plasmid vector, which is then transferred into a host cell.",
      "In the CRISPR-Cas9 system, a guide RNA recognises the target DNA sequence, and the Cas9 nuclease then cuts the DNA at a specific position, achieving precise gene editing.",
      "Applications include gene therapy, improving crops, studying gene function and establishing disease models.",
      "It raises ethical issues, such as the safety and fairness of editing genes in human embryos."
    ],
    concept: "CRISPR-Cas9 is a gene-editing tool developed in recent years. A guide RNA leads the Cas9 protein to a specific position in the genome, where it causes a double-strand break; during cell repair, DNA sequences can be deleted, replaced or inserted. Compared with earlier genetic engineering, it is more precise, faster and cheaper, moving recombinant DNA technology into a new stage of 'editing directly within the genome of an organism'.",
    sourceUrl: "https://www.genome.gov/genetics-glossary/CRISPR",
    mcqs: [
      { q: "In the CRISPR-Cas9 system, what is the main function of the guide RNA (gRNA)?", options: ["Recognising and binding to the target DNA sequence", "Joining broken DNA fragments", "Replicating the target gene", "Synthesising new proteins"], correct: 0, reasons: ["Correct answer", "Joining DNA fragments is the function of DNA ligase, not gRNA.", "Replicating DNA is the function of DNA polymerase.", "Synthesising proteins is the function of ribosomes."] },
      { q: "In CRISPR-Cas9, what is the main function of the Cas9 protein?", options: ["Breaking down mRNA outside the nucleus", "Cutting the two strands of DNA at the target position", "Inserting the target gene into a plasmid", "Stimulating B cells to produce antibodies"], correct: 1, reasons: ["The function of Cas9 is to cut DNA, not to break down mRNA.", "Correct answer", "Inserting a gene into a plasmid is done by restriction enzymes and DNA ligase together, not Cas9.", "Cas9 is not related to the immune system producing antibodies."] },
      { q: "In traditional recombinant DNA technology, which enzyme is described as the 'molecular scissors' used to cut DNA?", options: ["DNA ligase", "DNA polymerase", "Restriction enzyme", "Helicase"], correct: 2, reasons: ["DNA ligase is the 'molecular glue', responsible for joining fragments.", "DNA polymerase synthesises new strands and does not cut DNA.", "Correct answer", "Helicase separates the double strands during replication, but does not cut at specific sites."] },
      { q: "Which of the following correctly describes the advantage of CRISPR-Cas9 compared with earlier genetic engineering?", options: ["It certainly does not produce off-target effects", "It does not need any enzymes", "It can only be applied to plant cells", "It is more precise, faster and cheaper"], correct: 3, reasons: ["CRISPR can still produce off-target effects, i.e. cutting the wrong position.", "Cas9 itself is a nuclease, so the process needs enzymes.", "CRISPR can be applied to animal, plant and microbial cells.", "Correct answer"] },
      { q: "After Cas9 causes a double-strand break in the DNA, how does the cell complete the gene editing?", options: ["Using its own repair mechanisms to delete, replace or insert DNA sequences", "Immediately breaking down the whole chromosome", "Secreting the broken DNA out of the cell", "Stopping all protein synthesis"], correct: 0, reasons: ["Correct answer", "The cell does not break down the whole chromosome; it only repairs the broken site.", "The broken DNA is not secreted out of the cell.", "The cell does not stop protein synthesis because of gene editing."] }
    ]
  },
  {
    title: "Stem Cell Technology",
    subtitle: "The regenerative and therapeutic potential of undifferentiated cells",
    relatedTopics: [
      { no: 3, name: "Cellular Organisation" },
      { no: 15, name: "Growth and Development" },
      { no: 24, name: "Non-infectious Diseases and Disease Prevention" }
    ],
    coreConcepts: [
      "Stem cells are undifferentiated cells that can self-renew and differentiate into various specialised cells under specific conditions.",
      "Embryonic stem cells have a broader differentiation potential, while adult stem cells have a more limited potential.",
      "Cell differentiation refers to cells becoming specialised into different types to carry out different functions (Chapter 15).",
      "Applications include regenerative medicine (repairing damaged tissues), drug testing and disease research.",
      "It involves ethical controversies over the source of embryonic stem cells."
    ],
    concept: "Stem cell technology makes use of the self-renewal and differentiation abilities of stem cells. Cells are cultured outside the body and guided to differentiate into target cells (such as nerve cells and cardiac muscle cells), which are then transplanted back into patients to repair damaged tissues. Induced pluripotent stem cell (iPSC) technology can even 'reprogramme' adult cells into cells with embryonic stem cell potential, avoiding the use of embryos.",
    sourceUrl: "https://stemcells.nih.gov/",
    mcqs: [
      { q: "Which of the following are the two most important characteristics of stem cells?", options: ["They are specialised and cannot divide", "They can self-renew and differentiate into specialised cells", "They can only carry out meiosis", "They exist only in the meristems of plants"], correct: 1, reasons: ["Stem cells are undifferentiated cells that can divide and renew.", "Correct answer", "Stem cells proliferate by mitosis, not meiosis.", "Stem cells also exist in animals (such as the bone marrow)."] },
      { q: "Comparing embryonic stem cells and adult stem cells, which of the following is correct?", options: ["Adult stem cells have a broader differentiation potential than embryonic stem cells", "Both cannot differentiate at all", "Embryonic stem cells generally have a broader differentiation potential than adult stem cells", "Adult stem cells exist only in embryos"], correct: 2, reasons: ["Embryonic stem cells have a broader differentiation potential, while adult stem cells are more limited.", "Both can differentiate, but their potentials differ.", "Correct answer", "Adult stem cells exist in adult tissues, such as the bone marrow."] },
      { q: "What is the main significance of induced pluripotent stem cell (iPSC) technology?", options: ["Directly producing a complete embryo", "Making specialised cells permanently lose their ability to divide", "Obtaining stem cells only from embryos", "Reprogramming adult cells into cells with embryonic stem cell potential"], correct: 3, reasons: ["iPSC technology is not used to produce a complete embryo.", "Reprogramming restores the pluripotency of cells, not making them lose the ability to divide.", "iPSCs can indeed avoid the use of embryos, being prepared from adult cells.", "Correct answer"] },
      { q: "Which of the following is an application of stem cell technology in regenerative medicine?", options: ["Repairing damaged tissues, such as cardiac or nerve tissue", "Increasing the drug resistance of pathogens", "Increasing the rate of photosynthesis of crops", "Breaking down plastic waste"], correct: 0, reasons: ["Correct answer", "Stem cell technology is used for treatment, not increasing drug resistance.", "Increasing photosynthesis belongs to genetic engineering or breeding, not stem cell applications.", "Breaking down plastic waste is not related to stem cell technology."] },
      { q: "Which of the following is an ethical controversy of stem cell research?", options: ["Whether stem cells can carry out photosynthesis", "The use of human embryonic stem cells involves the moral status of the embryo", "Whether stem cells contain a nucleus", "Whether stem cells can store genetic information"], correct: 1, reasons: ["Photosynthesis is not part of the ethical controversy over stem cells.", "Correct answer", "Stem cells contain a nucleus; this is a fact, not a controversy.", "Storing genetic information is a function of DNA, not the focus of the controversy."] }
    ]
  },
  {
    title: "Vaccine Technology (mRNA Vaccines)",
    subtitle: "A new generation of vaccines using genetic instructions to induce immunological memory",
    relatedTopics: [
      { no: 23, name: "Personal Health and Infectious Diseases" },
      { no: 25, name: "Body Defence Mechanisms" },
      { no: 27, name: "Molecular Genetics" }
    ],
    coreConcepts: [
      "Vaccination introduces antigens into the body, triggering a primary immune response and producing memory cells, so that a rapid secondary response can be made when the pathogen is encountered again (Chapter 25).",
      "Active immunity is produced by the body's own immune system and is long-lasting; mRNA vaccines are a form of artificial active immunity.",
      "Transcription and translation: mRNA carries the genetic code, and proteins are synthesised at ribosomes in the cytoplasm (Chapter 27).",
      "mRNA vaccines use lipid nanoparticles to deliver mRNA encoding pathogen antigens into cells, which then synthesise the antigen proteins themselves, triggering an immune response.",
      "Advantages include fast design, rapid production and no integration into the genome."
    ],
    concept: "mRNA vaccines do not contain the whole pathogen. Instead, messenger RNA encoding the surface antigens of the pathogen (such as the spike protein) is delivered into human cells, where ribosomes translate it into antigen proteins. After the immune system recognises these proteins, it produces antibodies and memory cells. As only the mRNA sequence needs to be changed to respond to new viral strains, research, development and production are far faster than with traditional vaccines.",
    sourceUrl: "https://www.cdc.gov/vaccines/covid-19/hcp/mrna-vaccine.html",
    mcqs: [
      { q: "After an mRNA vaccine enters a human cell, in which organelle is the encoded antigen protein synthesised?", options: ["Mitochondrion", "Lysosome", "Ribosome", "Golgi body"], correct: 2, reasons: ["Mitochondria are responsible for aerobic respiration, not protein synthesis.", "Lysosomes contain digestive enzymes and are responsible for breaking down substances.", "Correct answer", "The Golgi body modifies and packages proteins, rather than synthesising them."] },
      { q: "Which of the following is an advantage of mRNA vaccines?", options: ["They certainly integrate into the human genome", "They contain a complete active pathogen", "They require a long time to culture the pathogen for production", "They are fast to design and produce"], correct: 3, reasons: ["mRNA vaccines do not integrate into the genome.", "mRNA vaccines do not contain a complete pathogen.", "mRNA vaccines are produced by sequence design and do not need a long time to culture the pathogen.", "Correct answer"] },
      { q: "The immunity induced by an mRNA vaccine belongs to which of the following types?", options: ["Artificial active immunity", "Natural passive immunity", "Artificial passive immunity", "Natural active immunity"], correct: 0, reasons: ["Correct answer", "Natural passive immunity refers to obtaining antibodies from the mother; it is not vaccination.", "Artificial passive immunity is directly injecting antibodies, not inducing the body to produce them.", "Natural active immunity is acquired after infection with the pathogen, not by vaccination."] },
      { q: "In an mRNA vaccine, what is the role of the lipid nanoparticles?", options: ["Acting as antigens to directly stimulate T cells", "Protecting the mRNA and helping it enter the cell", "Killing the pathogen", "Providing energy to the cell"], correct: 1, reasons: ["Lipid nanoparticles themselves are not antigens.", "Correct answer", "mRNA vaccines do not contain a complete pathogen, and the nanoparticles do not kill bacteria either.", "Providing energy is the function of respiratory substrates such as glucose."] },
      { q: "After receiving an mRNA vaccine, the body can respond rapidly to an invasion by the real pathogen, mainly because of the production of what?", options: ["Red blood cells", "Platelets", "Memory cells", "Keratinocytes"], correct: 2, reasons: ["Red blood cells carry oxygen and are not related to immunological memory.", "Platelets are responsible for blood clotting.", "Correct answer", "Keratinocytes are cells on the surface of the skin and do not take part in immunological memory."] }
    ]
  },
  {
    title: "Monoclonal Antibodies and Immunotherapy",
    subtitle: "Using specific antibodies against diseases and cancer",
    relatedTopics: [
      { no: 23, name: "Personal Health and Infectious Diseases" },
      { no: 25, name: "Body Defence Mechanisms" },
      { no: 28, name: "Biotechnology" }
    ],
    coreConcepts: [
      "After being activated by an antigen, B cells differentiate into plasma cells, which secrete highly specific antibodies (Chapter 25).",
      "Antibodies can agglutinate pathogens, promote phagocytosis, neutralise toxins, or destroy pathogens through lysis.",
      "Monoclonal antibodies are produced from a single B cell (or hybridoma cell) and target only a single antigenic determinant, giving high specificity.",
      "Applications include targeted cancer therapy, immunotherapy (such as immune checkpoint inhibitors and CAR-T cell therapy), diagnostic reagents and treatment of autoimmune diseases.",
      "Immunotherapy uses the body's own immune system to fight disease (T cell therapy, Chapter 25)."
    ],
    concept: "Monoclonal antibody technology fuses myeloma cells with B cells that can produce a specific antibody, forming hybridomas that can proliferate indefinitely and continuously secrete a single antibody, allowing large-scale production of antibodies against a specific antigen. In cancer treatment, monoclonal antibodies can mark cancer cells for attack by the immune system, or block the growth signals of cancer cells, achieving a 'targeted' effect.",
    sourceUrl: "https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/monoclonal-antibodies",
    mcqs: [
      { q: "The plasma cells that secrete antibodies are differentiated from which type of cell after activation?", options: ["Red blood cells", "Neurones", "T cells", "B cells"], correct: 3, reasons: ["Red blood cells do not produce antibodies.", "Neurones transmit nerve impulses.", "T cells are mainly responsible for cell-mediated immunity and do not secrete large amounts of antibodies.", "Correct answer"] },
      { q: "What is the greatest characteristic of monoclonal antibodies?", options: ["They are produced from a single B cell (hybridoma) and target only a single antigenic determinant", "They are produced by many kinds of B cells and can bind many antigens", "They contain no protein at all", "They can replicate DNA indefinitely"], correct: 0, reasons: ["Correct answer", "Monoclonal antibodies come from a single B cell and have high specificity.", "Antibodies themselves are proteins.", "Antibodies are proteins and do not replicate DNA."] },
      { q: "When producing monoclonal antibodies, what is the role of the myeloma cells?", options: ["Providing the antigen", "Making the fused cell proliferate indefinitely", "Secreting insulin", "Recognising cancer cells"], correct: 1, reasons: ["The antigen is provided externally; it is not produced by myeloma cells.", "Correct answer", "Secreting insulin is the function of the beta cells of the pancreas.", "Recognising cancer cells relies on antibodies or immune cells, not myeloma cells."] },
      { q: "In cancer treatment, how do monoclonal antibodies achieve a 'targeted' effect?", options: ["Directly dissolving all the patient's cells", "Changing all the patient's genes", "Marking cancer cells for attack by the immune system, or blocking the growth signals of cancer cells", "Providing nutrients to the cancer cells"], correct: 2, reasons: ["Monoclonal antibodies act specifically on cancer cells and do not dissolve all cells.", "Monoclonal antibodies do not change the patient's genes.", "Correct answer", "Monoclonal antibodies inhibit cancer cells, rather than providing nutrients."] },
      { q: "Which of the following is NOT an application of monoclonal antibodies?", options: ["Targeted cancer therapy", "Diagnostic reagents", "Immune checkpoint inhibitors", "Acting as restriction enzymes to cut DNA"], correct: 3, reasons: ["Targeted cancer therapy is a common application of monoclonal antibodies.", "Monoclonal antibodies can be used in diagnostic reagents.", "Immune checkpoint inhibitors are a type of immunotherapy.", "Correct answer"] }
    ]
  },
  {
    title: "Bioinformatics and DNA Fingerprinting",
    subtitle: "Reading life from base sequences and identifying individuals",
    relatedTopics: [
      { no: 26, name: "Basic Genetics" },
      { no: 27, name: "Molecular Genetics" },
      { no: 28, name: "Biotechnology" },
      { no: 30, name: "Origin of Life and Evidence of Evolution" }
    ],
    coreConcepts: [
      "DNA fingerprinting uses differences in the length of highly variable regions of DNA (non-coding repeated sequences) between individuals to identify identity (Chapter 28).",
      "Gel electrophoresis separates DNA fragments by molecular size; smaller fragments move faster (Chapter 28).",
      "Bioinformatics combines computer science and biology to store, analyse and compare large amounts of DNA base sequence data (such as the Human Genome Project).",
      "Comparing DNA base sequences or protein amino acid sequences can infer the evolutionary relationships of organisms (Chapter 30).",
      "Applications include forensic science, paternity testing, diagnosis of genetic diseases, species identification and evolutionary studies."
    ],
    concept: "DNA fingerprinting cuts an individual's DNA with restriction enzymes and separates the fragments by gel electrophoresis, forming a unique pattern of bands to identify the individual. Bioinformatics uses algorithms and databases to process massive amounts of sequence data, comparing an individual's genome with reference genomes. Together they form the basic tools of modern forensics, paternity testing and precision medicine.",
    sourceUrl: "https://www.genome.gov/genetics-glossary/DNA-Fingerprinting",
    mcqs: [
      { q: "Which type of region of DNA does DNA fingerprinting mainly use to identify individuals?", options: ["Highly variable non-coding repeated sequences", "Coding regions that are identical in all organisms", "Proteins of the outer mitochondrial membrane", "Cellulose of the cell wall"], correct: 0, reasons: ["Correct answer", "Coding regions differ relatively little between individuals; fingerprinting uses highly variable non-coding regions.", "Proteins of the outer mitochondrial membrane are not targets of DNA fingerprinting.", "Cellulose of the cell wall is not related to DNA fingerprinting."] },
      { q: "In gel electrophoresis, what is the basis for separating DNA fragments?", options: ["The colour of the fragments", "The number of nitrogen atoms in the fragments", "The size (molecular weight) of the fragments", "The temperature of the fragments"], correct: 2, reasons: ["Electrophoresis does not separate fragments by colour.", "Separation has no direct relationship with the number of nitrogen atoms.", "Correct answer", "Electrophoresis is carried out under constant conditions and is not related to the temperature of the fragments."] },
      { q: "In gel electrophoresis, what happens to smaller DNA fragments?", options: ["They stay at the starting point", "They move faster and travel further", "They move slower and travel less far", "They move in the opposite direction to the positive pole"], correct: 1, reasons: ["Smaller fragments move faster and do not stay at the starting point.", "Correct answer", "It is the larger fragments that move more slowly.", "DNA fragments carry a negative charge and move towards the positive pole; they do not move in the opposite direction."] },
      { q: "What is the main work of bioinformatics?", options: ["Observing animal behaviour in the field", "Culturing bacteria to produce antibiotics", "Observing cell division with a microscope", "Using computers to store, analyse and compare large amounts of DNA base sequences"], correct: 3, reasons: ["Field observation belongs to ecology.", "Culturing bacteria belongs to microbiology or biotechnology.", "Microscope observation is a method of cell biology.", "Correct answer"] },
      { q: "Comparing the DNA base sequences of different organisms can be used to infer what?", options: ["Their evolutionary relationships", "Their body weights", "The temperatures of their habitats", "Their lifespans"], correct: 0, reasons: ["Correct answer", "DNA sequences cannot directly show body weight.", "DNA sequences cannot directly show the temperature of habitats.", "DNA sequences cannot directly show lifespan."] }
    ]
  },
  {
    title: "Gene Therapy",
    subtitle: "The medical frontier of repairing disease-causing genes",
    relatedTopics: [
      { no: 26, name: "Basic Genetics" },
      { no: 27, name: "Molecular Genetics" },
      { no: 28, name: "Biotechnology" }
    ],
    coreConcepts: [
      "Gene therapy introduces normal genes into a patient's cells to replace or correct disease-causing genes, treating genetic diseases (Chapter 27).",
      "Vectors (such as modified viruses) are used to deliver the normal gene into target cells.",
      "Somatic cell gene therapy affects only the patient and is not inherited; changes from germline gene therapy can be inherited.",
      "Applications include sickle cell anaemia, haemophilia and some cancers (such as CAR-T cell therapy).",
      "It raises safety and ethical issues, including off-target effects and the high cost of treatment."
    ],
    concept: "Gene therapy uses vectors such as viruses to deliver normal or therapeutic genes into a patient's cells, enabling the cells to produce missing or defective proteins, or boosting the immune system to attack cancer cells. It advances treatment from 'supplementing with drugs' to 'correcting the genetic root cause'; however, off-target effects, immune responses and long-term safety still need to be overcome.",
    sourceUrl: "https://www.genome.gov/genetics-glossary/Gene-Therapy",
    mcqs: [
      { q: "What is the main purpose of gene therapy?", options: ["Introducing normal genes into a patient's cells to treat genetic diseases", "Directly removing an entire organ", "Changing the patient's diet", "Increasing the number of chromosomes"], correct: 0, reasons: ["Correct answer", "Gene therapy targets genes, not organ removal.", "Gene therapy does not rely on changing the diet.", "Gene therapy does not increase the number of chromosomes."] },
      { q: "What vector is commonly used in gene therapy?", options: ["Modified viruses", "Red blood cells", "Platelets", "Antibodies"], correct: 0, reasons: ["Correct answer", "Red blood cells carry oxygen and are not used as vectors.", "Platelets are responsible for clotting, not as vectors.", "Antibodies are immune molecules, not gene vectors."] },
      { q: "What is the difference between somatic cell gene therapy and germline gene therapy?", options: ["Changes in somatic cell therapy are inherited", "Changes in germline therapy are inherited", "Both are inherited", "Neither is inherited"], correct: 1, reasons: ["Somatic cell therapy affects only the patient and is not inherited.", "Correct answer", "Only germline changes can be inherited.", "Germline changes can be passed on to offspring."] },
      { q: "What is CAR-T cell therapy?", options: ["Taking out a patient's T cells, modifying them and infusing them back to attack cancer cells", "Directly injecting antibodies", "Removing the tumour by surgery", "Taking antibiotics"], correct: 0, reasons: ["Correct answer", "Injecting antibodies is a different immunotherapy, not CAR-T.", "CAR-T is not a surgical procedure.", "Antibiotics are ineffective against cancer."] },
      { q: "Which of the following is a challenge faced by gene therapy?", options: ["Off-target effects and immune responses", "Gene therapy is always ineffective", "Gene therapy needs no vector", "Gene therapy affects only offspring"], correct: 0, reasons: ["Correct answer", "Gene therapy is effective for some diseases.", "Gene therapy needs a vector to deliver genes.", "Somatic gene therapy does not affect offspring."] }
    ]
  },
  {
    title: "Synthetic Biology",
    subtitle: "The engineering of redesigning and building biological systems",
    relatedTopics: [
      { no: 27, name: "Molecular Genetics" },
      { no: 28, name: "Biotechnology" }
    ],
    coreConcepts: [
      "Synthetic biology applies engineering principles to biology, designing and building new biological parts, systems or organisms.",
      "Standardised DNA 'parts' (biobricks) are used to assemble artificial gene circuits.",
      "Applications include producing drugs (such as artemisinin), biofuels, biosensors and new materials.",
      "It requires a 'design–build–test' cycle and is combined with genome editing technologies.",
      "It raises biosafety and ethical issues, such as the risk of releasing engineered organisms into the environment."
    ],
    concept: "Synthetic biology treats organisms like an 'engineer': genes are viewed as parts that can be designed and assembled. Using standardised DNA bricks and artificial gene circuits, micro-organisms are redesigned to carry out specific tasks, such as synthesising drugs or fuels. It advances genetic engineering into a new stage of 'designing life systems from scratch', while also triggering biosafety and ethical debates.",
    sourceUrl: "https://www.genome.gov/genetics-glossary/Synthetic-Biology",
    mcqs: [
      { q: "What is the main feature of synthetic biology?", options: ["Applying engineering principles to design and build biological systems", "Only observing the external appearance of organisms", "Being used only for classifying plants", "Relying entirely on natural evolution"], correct: 0, reasons: ["Correct answer", "Synthetic biology is about design and construction, not observation.", "Synthetic biology is not limited to plant classification.", "Synthetic biology emphasises human design, not purely natural evolution."] },
      { q: "What are the 'biobricks' commonly used in synthetic biology?", options: ["Standardised DNA parts", "Protein crystals", "Mineral particles", "Sugar molecules"], correct: 0, reasons: ["Correct answer", "Synthetic biology uses DNA sequences as parts, not protein crystals.", "Mineral particles are not biological bricks.", "Sugar molecules are not the bricks of gene circuits."] },
      { q: "Which of the following is an application of synthetic biology?", options: ["Producing drugs and biofuels", "Making plastic waste", "Increasing environmental pollutants", "Reducing photosynthesis"], correct: 0, reasons: ["Correct answer", "Synthetic biology aims at useful products, not waste.", "Synthetic biology does not aim to increase pollution.", "Synthetic biology does not reduce photosynthesis."] },
      { q: "What is a main risk associated with synthetic biology?", options: ["Biosafety risks of releasing engineered organisms into the environment", "Engineered organisms are always harmless", "Synthetic biology needs no DNA", "Synthetic biology involves no ethical issues"], correct: 0, reasons: ["Correct answer", "Releasing engineered organisms into the environment carries risk.", "Synthetic biology is based on DNA.", "Synthetic biology involves biosafety and ethical issues."] },
      { q: "What is the relationship between synthetic biology and traditional genetic engineering?", options: ["Synthetic biology is a further development of genetic engineering, emphasising design from scratch", "The two are exactly the same", "Synthetic biology does not use DNA", "Synthetic biology is limited to animals"], correct: 0, reasons: ["Correct answer", "Synthetic biology emphasises standardisation and design from scratch.", "Synthetic biology is based on DNA.", "Synthetic biology is not limited to animals; it also applies to micro-organisms."] }
    ]
  },
  {
    title: "Artificial Intelligence in Biology",
    subtitle: "Interpreting biological data with machine learning",
    relatedTopics: [
      { no: 20, name: "Ecosystem" },
      { no: 28, name: "Biotechnology" },
      { no: 30, name: "Origin of Life and Evidence of Evolution" }
    ],
    coreConcepts: [
      "Artificial intelligence (AI) uses algorithms to find patterns in large amounts of biological data, for example predicting protein structure (AlphaFold).",
      "Machine learning can analyse genomes, medical images and ecological data.",
      "AI accelerates drug development, for example screening candidate drug molecules.",
      "In ecology, AI can be used for species identification and monitoring (such as bird-song recognition).",
      "Attention must be paid to data bias, model reliability and privacy issues."
    ],
    concept: "Artificial intelligence turns biology into a 'data science': algorithms learn patterns from massive genome, imaging or ecological datasets. For example, AlphaFold accurately predicts the three-dimensional structure of proteins, greatly accelerating drug development and basic research. The combination of AI and biology moves traditional 'hypothesis-driven' research into a new 'data-driven' stage, while also bringing challenges of data privacy and bias.",
    sourceUrl: "https://www.nature.com/subjects/artificial-intelligence",
    mcqs: [
      { q: "What is the main achievement of AlphaFold?", options: ["Accurately predicting the three-dimensional structure of proteins", "Making new viruses", "Cloning humans", "Measuring the rate of photosynthesis"], correct: 0, reasons: ["Correct answer", "AlphaFold predicts protein structures.", "AlphaFold is not involved in cloning humans.", "Measuring photosynthesis is laboratory work, not AlphaFold's achievement."] },
      { q: "What is the application of AI in drug development?", options: ["Screening candidate drug molecules to speed up development", "Directly experimenting on humans", "Replacing all doctors", "Producing environmental pollutants"], correct: 0, reasons: ["Correct answer", "AI is used to screen molecules, not for direct human experiments.", "AI assists rather than replaces doctors.", "AI does not aim to produce pollutants."] },
      { q: "Which of the following is an application of AI in ecology?", options: ["Species identification and monitoring", "Making forests", "Increasing carbon emissions", "Stopping evolution"], correct: 0, reasons: ["Correct answer", "AI can identify species but cannot make forests.", "AI does not increase carbon emissions.", "AI does not control evolution."] },
      { q: "Which of the following is NOT a challenge faced by AI in biology?", options: ["AI has no errors at all", "Data bias", "Model reliability", "Data privacy"], correct: 0, reasons: ["Correct answer", "AI models are affected by data bias.", "Model reliability is a challenge to be faced.", "Data privacy is an important consideration."] },
      { q: "What is the relationship between AI and traditional biological research?", options: ["AI finds patterns in large data, assisting traditional research", "AI replaces all experiments", "AI has nothing to do with biology", "AI can only process text"], correct: 0, reasons: ["Correct answer", "AI assists experiments but cannot replace all of them.", "AI is widely applied in biology.", "AI can also process genomes and images."] }
    ]
  },
  {
    title: "Single-cell Sequencing",
    subtitle: "Reading gene expression cell by cell",
    relatedTopics: [
      { no: 27, name: "Molecular Genetics" },
      { no: 28, name: "Biotechnology" }
    ],
    coreConcepts: [
      "Traditional sequencing analyses the average result of many cells, while single-cell sequencing analyses the gene expression or DNA sequence of each cell individually.",
      "Single-cell RNA sequencing (scRNA-seq) can distinguish different cell types and their states.",
      "Applications include building a human cell atlas, studying tumour heterogeneity and developmental processes.",
      "It is combined with bioinformatics to process massive single-cell data.",
      "It helps discover rare cell types and disease mechanisms."
    ],
    concept: "Single-cell sequencing advances the 'averaged' analysis of tissues to a resolution of 'cell by cell'. For example, single-cell RNA sequencing can map the gene-expression profile of every cell type in a tissue, revealing heterogeneity within tumours and cell differentiation during development. Combined with bioinformatics and AI, it is rewriting our understanding of the unit of life — the cell.",
    sourceUrl: "https://www.genome.gov/genetics-glossary/Single-Cell-Sequencing",
    mcqs: [
      { q: "What is the difference between single-cell sequencing and traditional sequencing?", options: ["Single-cell sequencing analyses each cell individually, while traditional sequencing analyses the overall average", "The two are exactly the same", "Single-cell sequencing cannot measure RNA", "Traditional sequencing has higher resolution"], correct: 0, reasons: ["Correct answer", "Single-cell sequencing provides higher single-cell resolution.", "Single-cell RNA sequencing is a common technique.", "Single-cell sequencing has higher, not lower, resolution."] },
      { q: "What is single-cell RNA sequencing (scRNA-seq) mainly used for?", options: ["Distinguishing different cell types and states", "Measuring body weight", "Observing leaf colour", "Testing water quality"], correct: 0, reasons: ["Correct answer", "scRNA-seq analyses gene expression to distinguish cell types.", "Body weight is unrelated to gene expression.", "Observing leaf colour needs no sequencing.", "Water testing is not single-cell sequencing."] },
      { q: "Which of the following is an application of single-cell sequencing?", options: ["Studying tumour heterogeneity", "Making antibiotics", "Increasing crop yield", "Measuring blood pressure"], correct: 0, reasons: ["Correct answer", "Single-cell sequencing reveals cell differences within a tumour.", "Making antibiotics is microbial fermentation.", "Increasing yield is breeding.", "Blood pressure is unrelated to sequencing."] },
      { q: "What is needed to process single-cell sequencing data?", options: ["Bioinformatics and AI analysis", "Manual recording with a microscope", "No computers at all", "Only the naked eye"], correct: 0, reasons: ["Correct answer", "Massive single-cell data need computers and bioinformatics.", "Manual recording cannot handle massive data.", "Single-cell data are huge and require computers.", "The naked eye cannot analyse massive data."] },
      { q: "Single-cell sequencing helps with what?", options: ["Discovering rare cell types and disease mechanisms", "Making all cells identical", "Increasing the number of chromosomes", "Stopping cell differentiation"], correct: 0, reasons: ["Correct answer", "Single-cell sequencing can reveal rare cell types.", "Sequencing does not change cells.", "Sequencing does not increase chromosomes.", "Sequencing does not stop differentiation."] }
    ]
  },
  {
    title: "Precision Medicine and Genomics",
    subtitle: "A new era of healthcare tailored to individual genes",
    relatedTopics: [
      { no: 26, name: "Basic Genetics" },
      { no: 27, name: "Molecular Genetics" },
      { no: 28, name: "Biotechnology" }
    ],
    coreConcepts: [
      "Precision medicine tailors prevention and treatment according to an individual's genome, environment and lifestyle.",
      "Genome sequencing can identify disease-related genetic variants and assess disease risk.",
      "Pharmacogenomics studies how genes affect drug responses and side effects.",
      "Applications include targeted cancer therapy and genetic disease risk assessment.",
      "It raises issues of genetic data privacy, fairness and ethics."
    ],
    concept: "Precision medicine puts personal genomic data at the centre, changing 'one drug for all' into 'treatment tailored to each person': for example, tumour genome analysis identifies specific mutations and then selects the corresponding targeted drug, or drug doses are adjusted according to pharmacogenomic results. It translates genetics knowledge into clinical decisions, while carefully handling data privacy and fairness.",
    sourceUrl: "https://www.genome.gov/genetics-glossary/Precision-Medicine",
    mcqs: [
      { q: "What is the core idea of precision medicine?", options: ["Tailoring treatment according to an individual's genes, environment and lifestyle", "Using the same drug for all patients", "Treating only the symptoms", "Relying on no data at all"], correct: 0, reasons: ["Correct answer", "Precision medicine emphasises individualised treatment.", "Precision medicine targets the root cause rather than just symptoms.", "Precision medicine relies on genomic and other data."] },
      { q: "What does pharmacogenomics study?", options: ["How genes affect drug responses and side effects", "How drugs change the climate", "How genes affect height", "How drugs disinfect the environment"], correct: 0, reasons: ["Correct answer", "Pharmacogenomics explores the relationship between genes and drug responses.", "It is unrelated to climate.", "Height is not the subject of pharmacogenomics.", "Disinfecting the environment is not pharmacogenomics."] },
      { q: "What can tumour genome analysis help with?", options: ["Finding mutations and choosing the corresponding targeted drug", "Enlarging the tumour", "Replacing all treatments", "Removing all of a patient's genes"], correct: 0, reasons: ["Correct answer", "The analysis aims to guide targeted therapy.", "Analysis does not enlarge tumours.", "Analysis assists treatment rather than replacing everything.", "Analysis does not remove all genes."] },
      { q: "What ethical issues are involved in precision medicine?", options: ["Genetic data privacy and fairness", "Drugs being too cheap", "Too many hospitals", "A shortage of doctors"], correct: 0, reasons: ["Correct answer", "Privacy and fairness are key ethical issues.", "High drug cost is a common problem.", "It is unrelated to the number of hospitals.", "It has no direct relation to the number of doctors."] },
      { q: "What can genome sequencing assess?", options: ["Disease-related genetic variants and disease risk", "Body weight", "Hairstyle", "The weather"], correct: 0, reasons: ["Correct answer", "Sequencing analyses genetic variants and disease risk.", "Body weight is not directly assessed by genome sequencing.", "Hairstyle is not the content of genome sequencing.", "Weather is unrelated to the genome."] }
    ]
  },
  {
    title: "Tissue Engineering and Artificial Organs",
    subtitle: "Rebuilding damaged tissues with cells and scaffolds",
    relatedTopics: [
      { no: 3, name: "Cellular Organisation" },
      { no: 15, name: "Growth and Development" },
      { no: 24, name: "Non-infectious Diseases and Disease Prevention" }
    ],
    coreConcepts: [
      "Tissue engineering combines cells, biomaterials (scaffolds) and growth factors to rebuild tissues in vitro or in vivo.",
      "Scaffolds provide a three-dimensional environment for cells to attach, grow and differentiate.",
      "Artificial skin, artificial tracheas and artificial blood vessels already have clinical applications.",
      "Combined with stem cell technology and bioprinting, more complex organs can be manufactured.",
      "It is applied to repairing burnt skin, cartilage defects and organ failure."
    ],
    concept: "Tissue engineering turns 'repairing organs' into 'rebuilding tissues': stem cells from the patient are first cultured on a biocompatible scaffold and then implanted to repair damaged tissue, or artificial organs are made directly by 3D bioprinting. It combines cell biology and materials science, offering a new way out of the shortage of organ transplants, although vascularisation and long-term function remain challenges.",
    sourceUrl: "https://www.nibib.nih.gov/science-education/science-topics/tissue-engineering-and-regenerative-medicine",
    mcqs: [
      { q: "What are the main components of tissue engineering?", options: ["Cells, scaffolds and growth factors", "Rocks and minerals", "Plastic and glass", "Metal screws"], correct: 0, reasons: ["Correct answer", "Tissue engineering uses biomaterials, not rocks, as scaffolds.", "Plastic and glass are not biocompatible materials.", "Metal screws are not a component of tissue engineering."] },
      { q: "What is the role of the scaffold in tissue engineering?", options: ["Providing a three-dimensional environment for cell growth", "Killing cells", "Storing food", "Transporting oxygen to the lungs"], correct: 0, reasons: ["Correct answer", "Scaffolds let cells attach, grow and differentiate.", "Scaffolds do not kill cells.", "Scaffolds do not store food.", "Transporting oxygen to the lungs is unrelated to scaffolds."] },
      { q: "Which of the following is an application of tissue engineering?", options: ["Artificial skin to repair burns", "Making plastic bags", "Increasing pollutants", "Measuring temperature"], correct: 0, reasons: ["Correct answer", "Artificial skin is an application of tissue engineering.", "Plastic bags are not biological tissue.", "Tissue engineering does not aim to increase pollution.", "Measuring temperature is unrelated to tissue engineering."] },
      { q: "With which technology can tissue engineering manufacture more complex organs?", options: ["Stem cell technology and bioprinting", "Brewing technology", "Mining technology", "Astronomy"], correct: 0, reasons: ["Correct answer", "Stem cells and bioprinting can build complex organs.", "Brewing is unrelated to organ manufacture.", "Mining is unrelated.", "Astronomy is unrelated."] },
      { q: "What is the main challenge faced by tissue engineering?", options: ["Vascularisation and long-term function", "Too many cells", "Scaffolds being too expensive", "There being no challenges at all"], correct: 0, reasons: ["Correct answer", "Building a vascular network is the biggest difficulty.", "Cell number is not the main challenge.", "Cost is one challenge, but vascularisation is more critical.", "Tissue engineering still has many challenges."] }
    ]
  },
  {
    title: "Nanomedicine",
    subtitle: "Diagnosis and treatment at the nanoscale",
    relatedTopics: [
      { no: 3, name: "Cellular Organisation" },
      { no: 24, name: "Non-infectious Diseases and Disease Prevention" }
    ],
    coreConcepts: [
      "Nanomedicine uses nanoparticles (1–100 nm) for diagnosis, imaging and drug delivery.",
      "Nanoparticles can deliver drugs precisely to target cells (such as cancer cells), reducing side effects.",
      "Lipid nanoparticles are already used for mRNA vaccine delivery.",
      "Nanoprobes can be used to detect biomolecules and disease markers.",
      "Attention is paid to the biocompatibility and long-term toxicity of nanoparticles."
    ],
    concept: "Nanomedicine designs materials at the scale of 1–100 nanometres: for example, anticancer drugs are wrapped in nanoparticles that, after modification, target cancer cells specifically, reducing harm to normal tissues; lipid nanoparticles have also become the key to the successful delivery of mRNA vaccines. It opens new routes for 'precise delivery' and 'early diagnosis'.",
    sourceUrl: "https://www.nano.gov/nanotech-101/what/uses",
    mcqs: [
      { q: "What is the approximate size range of nanoparticles?", options: ["1–100 nm", "1–100 mm", "1–100 m", "1–100 km"], correct: 0, reasons: ["Correct answer", "Nanoparticles are at the nanometre scale (nm).", "A millimetre is too large for nanotech.", "Meters and kilometres are even more unsuitable.", "Kilometres do not match the nanoscale."] },
      { q: "What is the benefit of delivering drugs with nanoparticles?", options: ["Targeting cells precisely and reducing side effects", "Making drugs more expensive", "Increasing toxicity", "Being unable to reach cells"], correct: 0, reasons: ["Correct answer", "Precise delivery reduces harm to normal tissues.", "The benefit is not a price increase.", "Nanodelivery aims to reduce toxicity.", "Nanoparticles can reach target cells."] },
      { q: "Lipid nanoparticles are already applied to what?", options: ["Drug delivery for mRNA vaccines", "Brewing", "Textiles", "Construction"], correct: 0, reasons: ["Correct answer", "Lipid nanoparticles are the delivery system for mRNA vaccines.", "Brewing is unrelated to nanoparticles.", "Textiles are unrelated.", "Construction is unrelated."] },
      { q: "What is a concern of nanomedicine?", options: ["Biocompatibility and long-term toxicity", "The particles being too large", "Being unable to diagnose", "The cost being zero"], correct: 0, reasons: ["Correct answer", "Biocompatibility and toxicity are safety considerations.", "Nanoparticles are very small.", "Nanoparticles can be used for diagnosis.", "The cost is not zero."] },
      { q: "For what diagnostic purpose can nanoparticles be used?", options: ["Detecting biomolecules and disease markers", "Measuring blood pressure", "Checking eyesight", "Detecting the weather"], correct: 0, reasons: ["Correct answer", "Nanoprobes can detect biomolecules.", "Measuring blood pressure needs no nanoparticles.", "Checking eyesight needs no nanoparticles.", "Detecting the weather is unrelated to nanoparticles."] }
    ]
  },
  {
    title: "Biosensors",
    subtitle: "Devices that convert biological reactions into measurable signals",
    relatedTopics: [
      { no: 5, name: "Metabolism and Enzymes" },
      { no: 17, name: "Coordination in Humans" },
      { no: 19, name: "Homeostasis" }
    ],
    coreConcepts: [
      "A biosensor consists of a biological recognition element (enzyme, antibody or DNA) and a transducer.",
      "After the recognition element binds the target substance (such as glucose), the transducer converts the reaction into an electrical signal.",
      "The glucose meter is a famous example: it uses glucose oxidase to detect blood glucose.",
      "Applications include medical monitoring, food testing and environmental monitoring.",
      "Wearable biosensors can continuously monitor physiological parameters."
    ],
    concept: "Biosensors combine 'biological recognition' with 'electronic signals': for example, a glucose meter uses glucose oxidase to catalyse the oxidation of glucose, producing a measurable electrical signal that lets diabetes patients monitor themselves. They are developing from single measurements into wearable continuous monitoring, becoming an important tool for precision health management.",
    sourceUrl: "https://www.nibib.nih.gov/science-education/science-topics/biosensors",
    mcqs: [
      { q: "What two parts make up a biosensor?", options: ["A biological recognition element and a transducer", "Rocks and metals", "Lenses and light bulbs", "Paper and ink"], correct: 0, reasons: ["Correct answer", "The recognition element identifies and the transducer converts to a signal.", "Rocks and metals are not sensor components.", "Lenses and bulbs are unrelated to biosensing.", "Paper and ink are unrelated."] },
      { q: "Which enzyme does a glucose meter use to detect blood glucose?", options: ["Glucose oxidase", "Protease", "Lipase", "Amylase"], correct: 0, reasons: ["Correct answer", "Glucose oxidase catalyses the oxidation of glucose.", "Protease breaks down proteins.", "Lipase breaks down lipids.", "Amylase breaks down starch."] },
      { q: "What is the role of the transducer?", options: ["Converting the biological reaction into an electrical signal", "Killing bacteria", "Storing energy", "Producing antibodies"], correct: 0, reasons: ["Correct answer", "The transducer converts the reaction into a measurable signal.", "Killing bacteria is not a transducer function.", "Storing energy is not a transducer function.", "Antibodies are produced by immune cells."] },
      { q: "Which of the following is NOT an application of biosensors?", options: ["Measuring the distance to the Moon", "Medical monitoring", "Food testing", "Environmental monitoring"], correct: 0, reasons: ["Correct answer", "Measuring the Moon's distance is astronomy, not biosensing.", "Medical monitoring is a common application.", "Food testing is a common application.", "Environmental monitoring is a common application."] },
      { q: "What is a characteristic of wearable biosensors?", options: ["They can continuously monitor physiological parameters", "They can only be used once", "They cannot measure any parameter", "They are limited to hospitals"], correct: 0, reasons: ["Correct answer", "Wearable sensors can monitor continuously.", "Wearable sensors can be reused.", "They can measure parameters such as heart rate.", "Wearable sensors can be used in daily life."] }
    ]
  },
  {
    title: "Human Microbiome and Probiotics",
    subtitle: "The miniature ecosystem inside the human body",
    relatedTopics: [
      { no: 6, name: "Food and Humans" },
      { no: 23, name: "Personal Health and Infectious Diseases" }
    ],
    coreConcepts: [
      "The microbiome is the community of micro-organisms living on and inside the human body (such as the gut).",
      "Gut bacteria help digest fibre, synthesise vitamins (such as vitamin K) and defend against pathogens.",
      "Probiotics are live micro-organisms beneficial to the host that can improve the balance of gut flora.",
      "Imbalance of the microbiome is linked to obesity, diabetes and allergies.",
      "Faecal microbiota transplantation (FMT) can treat Clostridium difficile infection."
    ],
    concept: "The human microbiome is our 'second genome' that lives in symbiosis with us: gut bacteria break down dietary fibre, synthesise vitamins and train the immune system. Supplementing with probiotics or using faecal microbiota transplantation can rebuild a healthy flora, treating infections or metabolic diseases, making 'nurturing health with microbes' a new direction in modern medicine.",
    sourceUrl: "https://www.genome.gov/genetics-glossary/Microbiome",
    mcqs: [
      { q: "What is the human microbiome?", options: ["The community of symbiotic micro-organisms on and inside the human body", "All the cells of the human body", "The human skeleton", "Human hair"], correct: 0, reasons: ["Correct answer", "The microbiome refers to micro-organisms living with the body.", "Human cells are not the microbiome.", "Bones are not micro-organisms.", "Hair is not micro-organisms."] },
      { q: "Which of the following is NOT a function of gut bacteria?", options: ["Carrying out photosynthesis", "Helping digest fibre", "Synthesising vitamins", "Defending against pathogens"], correct: 0, reasons: ["Correct answer", "Gut bacteria do not carry out photosynthesis.", "Gut bacteria can break down dietary fibre.", "Gut bacteria can synthesise vitamins.", "Gut bacteria can defend against pathogens."] },
      { q: "What are probiotics?", options: ["Live micro-organisms beneficial to the host", "Viruses", "Cancer cells", "Minerals"], correct: 0, reasons: ["Correct answer", "Probiotics are live bacteria beneficial to the host.", "Viruses are usually harmful.", "Cancer cells are harmful.", "Minerals are not micro-organisms."] },
      { q: "Imbalance of the microbiome is linked to which diseases?", options: ["Obesity and diabetes", "Fractures", "Short-sightedness", "Long-sightedness"], correct: 0, reasons: ["Correct answer", "Flora imbalance is linked to metabolic diseases and allergies.", "Fractures are unrelated to the microbiome.", "Short-sightedness is unrelated.", "Long-sightedness is unrelated."] },
      { q: "Faecal microbiota transplantation (FMT) is used to treat what?", options: ["Clostridium difficile infection", "The common cold", "Fractures", "Asthma"], correct: 0, reasons: ["Correct answer", "FMT rebuilds flora to treat C. difficile infection.", "The common cold is not treated by FMT.", "Fractures are unrelated to flora.", "Asthma is generally not treated by FMT."] }
    ]
  },
  {
    title: "Organ-on-a-chip",
    subtitle: "Simulating human organs on a chip",
    relatedTopics: [
      { no: 3, name: "Cellular Organisation" },
      { no: 17, name: "Coordination in Humans" },
      { no: 19, name: "Homeostasis" }
    ],
    coreConcepts: [
      "An organ-on-a-chip cultures living cells on a microfluidic chip to simulate the key functions of an organ.",
      "Microchannels on the chip supply culture medium, mimicking blood flow.",
      "It can be used for drug testing, reducing animal experiments.",
      "Lung, gut and heart chips are already under study.",
      "Linking multiple organ chips can build a 'human-on-a-chip'."
    ],
    concept: "Organ-on-a-chip combines micro-engineering with cell biology: on a chip only a few centimetres wide, microchannels perfuse culture medium so that living cells reproduce the functions and physical environment of organs (such as the stretching of the lung and the peristalsis of the gut). Drugs can be tested on the chip first, reducing reliance on animal experiments and improving the accuracy of drug prediction.",
    sourceUrl: "https://www.nibib.nih.gov/science-education/science-topics/organ-chips",
    mcqs: [
      { q: "What is an organ-on-a-chip?", options: ["Culturing living cells on a microfluidic chip to simulate an organ", "A computer processor chip", "A solar panel", "A battery"], correct: 0, reasons: ["Correct answer", "An organ chip is used to simulate organ functions.", "A computer chip is not an organ chip.", "Solar panels are unrelated to organ simulation.", "Batteries are unrelated."] },
      { q: "What is the role of the microchannels in an organ-on-a-chip?", options: ["Supplying culture medium to mimic blood flow", "Storing food", "Producing light", "Heating the chip"], correct: 0, reasons: ["Correct answer", "Microchannels perfuse medium to mimic blood flow.", "Microchannels do not store food.", "Microchannels do not produce light.", "Microchannels are not for heating."] },
      { q: "What is the main application of organ-on-a-chip?", options: ["Drug testing, reducing animal experiments", "Making electrical appliances", "Measuring the weather", "Increasing environmental pollution"], correct: 0, reasons: ["Correct answer", "Organ chips can serve as drug-testing models.", "Making appliances is unrelated.", "Measuring weather is unrelated.", "Organ chips do not aim to increase pollution."] },
      { q: "Which organ chips are already under study?", options: ["Lung, gut and heart chips", "Chips that can think", "Chips that can reproduce", "Chips that can fly"], correct: 0, reasons: ["Correct answer", "Lung, gut and heart chips are under study.", "Chips cannot think.", "Chips do not reproduce.", "Chips cannot fly."] },
      { q: "What does 'human-on-a-chip' mean?", options: ["Linking multiple organ chips to simulate the whole human body", "A single extremely large chip", "A chip containing a real human body", "A chip that can replace the brain"], correct: 0, reasons: ["Correct answer", "Human-on-a-chip links multiple organ chips.", "Chips are very small.", "Chips do not contain a real body.", "Chips cannot replace the brain."] }
    ]
  },
  {
    title: "Biofuels",
    subtitle: "Renewable energy converted from biomass",
    relatedTopics: [
      { no: 5, name: "Metabolism and Enzymes" },
      { no: 10, name: "Nutrition and Gas Exchange in Plants" },
      { no: 20, name: "Ecosystem" }
    ],
    coreConcepts: [
      "Biofuels are made from biomass (such as crops, algae and waste), including bioethanol and biodiesel.",
      "Bioethanol is produced by fermentation, converting starch or sugars into ethanol.",
      "Microalgae can produce large amounts of oils, serving as third-generation biofuels.",
      "Compared with fossil fuels, the carbon dioxide released by burning biofuels can be reabsorbed by the source plants, making them lower-carbon fuels.",
      "The conflict between food production and land use must be balanced."
    ],
    concept: "Biofuels extract the chemical energy stored by plants through photosynthesis from solar energy: for example, yeast ferments sucrose or starch into bioethanol, or microalgal oils are used to make biodiesel. Although it is regarded as a renewable, lower-carbon energy source, large-scale cultivation of feedstock crops may compete with food production for land and water.",
    sourceUrl: "https://www.energy.gov/eere/bioenergy/biofuel-basics",
    mcqs: [
      { q: "By what process is bioethanol mainly produced?", options: ["Fermentation converting sugars into ethanol", "Photosynthesis directly producing ethanol", "Burning coal", "Distilling sea water"], correct: 0, reasons: ["Correct answer", "Bioethanol is produced by microbial fermentation of sugars.", "Photosynthesis produces glucose, not ethanol.", "Burning coal produces fossil fuel.", "Distilling sea water does not produce ethanol."] },
      { q: "What is the advantage of microalgae as a biofuel feedstock?", options: ["They grow quickly and can produce large amounts of oil", "They need a lot of land", "They cannot produce oil", "They grow only in deserts"], correct: 0, reasons: ["Correct answer", "Microalgae grow fast and have high oil yield.", "Microalgae can be cultured in ponds or reactors, using relatively little land.", "Microalgae can produce oils.", "Microalgae grow in water, not only in deserts."] },
      { q: "Why is biofuel regarded as lower-carbon?", options: ["The carbon dioxide released on burning can be reabsorbed by the source plants", "Burning does not release carbon dioxide", "Biofuels contain no carbon", "Biofuels release oxygen"], correct: 0, reasons: ["Correct answer", "Source plants absorb carbon dioxide by photosynthesis, completing the carbon cycle.", "Burning still releases carbon dioxide.", "Biofuels contain carbon.", "Releasing oxygen is not the reason for being lower-carbon."] },
      { q: "What is the conflict between biofuels and food production?", options: ["Feedstock crops compete with food for land and water", "Biofuels need no feedstock", "Biofuels make food surplus", "The two are completely unrelated"], correct: 0, reasons: ["Correct answer", "Large-scale cultivation of feedstock occupies land and water.", "Biofuels need feedstock.", "Growing feedstock does not create food surplus.", "The two do compete."] },
      { q: "Biodiesel is mainly made from what?", options: ["Oils (such as vegetable oils)", "Starch", "Proteins", "Cellulose"], correct: 0, reasons: ["Correct answer", "Biodiesel is made by transesterifying oils.", "Starch is used to produce bioethanol.", "Proteins are not a biodiesel feedstock.", "Cellulose is generally not a biodiesel feedstock."] }
    ]
  },
  {
    title: "Plant Tissue Culture and Micropropagation",
    subtitle: "Biotechnology for the asexual propagation of valuable plants",
    relatedTopics: [
      { no: 13, name: "Reproduction in Flowering Plants" },
      { no: 15, name: "Growth and Development" }
    ],
    coreConcepts: [
      "Plant tissue culture is the culture of plant tissue (explants) into complete plants under sterile conditions.",
      "It relies on the totipotency of plant cells: every cell contains all the genetic information needed to grow into a complete plant.",
      "Micropropagation can rapidly produce large numbers of genetically identical plants in a short time.",
      "Applications include propagating orchids, rescuing endangered plants and producing virus-free plants.",
      "The culture medium contains plant hormones (auxins and cytokinins) to regulate rooting and shooting."
    ],
    concept: "Plant tissue culture makes use of 'cell totipotency': under sterile conditions, hormones induce explants to develop shoots and roots, forming complete plants. Micropropagation can mass-produce precious orchids, virus-free seed potatoes or endangered plants in a single test tube, making it an important tool for agriculture and conservation, and a practical application of the principle of asexual reproduction.",
    sourceUrl: "https://www.nal.usda.gov/plant-production-gardening/plant-tissue-culture",
    mcqs: [
      { q: "What is an 'explant' in plant tissue culture?", options: ["A small piece of plant tissue used for culture", "Bacteria in the culture medium", "Soil particles", "Mature seeds"], correct: 0, reasons: ["Correct answer", "An explant is tissue taken from a plant for culture.", "Bacteria are contaminants, not explants.", "Soil particles are not explants.", "Explants are generally tissues, not mature seeds."] },
      { q: "On which property of cells does plant tissue culture rely?", options: ["Totipotency", "Having chloroplasts only", "Having cell walls only", "Being unable to divide"], correct: 0, reasons: ["Correct answer", "Totipotency lets a single cell grow into a complete plant.", "Chloroplasts are unrelated to totipotency.", "The cell wall is not the key property.", "Culture actually requires cell division."] },
      { q: "What is the advantage of micropropagation?", options: ["Rapidly producing large numbers of genetically identical plants", "Changing the plant's genes", "Needing large areas of land", "Being unable to propagate orchids"], correct: 0, reasons: ["Correct answer", "Micropropagation can copy plants rapidly and in large numbers.", "Plants produced asexually have genes identical to the parent.", "Tissue culture occupies little space.", "Orchids are often propagated by tissue culture."] },
      { q: "What regulates rooting and shooting in the culture medium?", options: ["Plant hormones", "Antibiotics", "Pigments", "Table salt"], correct: 0, reasons: ["Correct answer", "Auxins and cytokinins regulate rooting and shooting.", "Antibiotics suppress bacterial contamination.", "Pigments do not regulate growth.", "Salt does not regulate rooting and shooting."] },
      { q: "Which of the following is NOT an application of plant tissue culture?", options: ["Making plastic", "Propagating orchids", "Rescuing endangered plants", "Producing virus-free plants"], correct: 0, reasons: ["Correct answer", "Tissue culture is for plant propagation, not plastic.", "Propagating orchids is a common application.", "Rescuing endangered plants is an application.", "Producing virus-free plants is an application."] }
    ]
  },
  {
    title: "RNA Interference and Gene Silencing",
    subtitle: "Precisely regulating gene expression with small RNAs",
    relatedTopics: [
      { no: 27, name: "Molecular Genetics" },
      { no: 28, name: "Biotechnology" }
    ],
    coreConcepts: [
      "RNA interference (RNAi) uses small RNA molecules (such as siRNA and miRNA) to silence the expression of specific genes.",
      "siRNA binds complementarily to the target mRNA, guiding its degradation and preventing protein synthesis (translation).",
      "It is an important tool for studying gene function: turning a gene 'off' to observe its role.",
      "Applications include treating diseases (such as RNAi drugs) and improving crops.",
      "Highly specific sequences must be designed to avoid off-target effects."
    ],
    concept: "RNA interference is a naturally occurring gene-regulation mechanism in cells: small RNA molecules bind complementarily to target mRNA and guide its degradation or inhibit translation, 'silencing' a specific gene. Scientists use siRNA to precisely switch off genes in the laboratory to study their functions, and are developing RNA drugs to treat diseases from rare disorders to cancer.",
    sourceUrl: "https://www.genome.gov/genetics-glossary/RNA-Interference",
    mcqs: [
      { q: "What is the main role of siRNA in RNA interference?", options: ["Binding complementarily to the target mRNA and degrading it", "Replicating DNA", "Synthesising proteins", "Carrying amino acids"], correct: 0, reasons: ["Correct answer", "siRNA guides the degradation of mRNA to silence genes.", "Replicating DNA is the function of polymerases.", "Synthesising proteins is the function of ribosomes.", "Carrying amino acids is the function of tRNA."] },
      { q: "What can RNA interference result in?", options: ["Silencing of a specific gene", "Enhanced expression of all genes", "An increase in chromosome number", "Faster cell division"], correct: 0, reasons: ["Correct answer", "RNAi reduces the expression of a specific gene.", "RNAi suppresses rather than enhances expression.", "RNAi does not change chromosome number.", "RNAi does not speed up cell division."] },
      { q: "What is the role of RNA interference in studying gene function?", options: ["Switching a gene off to observe its role", "Making a gene larger", "Increasing the number of genes", "Replacing the whole genome"], correct: 0, reasons: ["Correct answer", "Switching a gene off helps infer its function.", "RNAi does not change gene size.", "RNAi does not increase gene number.", "RNAi does not replace the genome."] },
      { q: "What are the applications of RNA interference drugs?", options: ["Treating diseases", "Making plastic", "Increasing environmental pollution", "Replacing vaccines"], correct: 0, reasons: ["Correct answer", "RNA drugs can treat many diseases.", "Making plastic is unrelated to RNA drugs.", "Drugs do not aim to increase pollution.", "RNA drugs are another therapy, not a vaccine replacement."] },
      { q: "What should be noted in RNA interference drugs?", options: ["Avoiding off-target effects", "The longer the drug the better", "No specificity is needed", "Targeting only DNA"], correct: 0, reasons: ["Correct answer", "Off-target effects would silence the wrong gene.", "Length is not the key; specificity is.", "RNAi needs a specific sequence.", "RNAi targets mRNA, not DNA."] }
    ]
  },
  {
    title: "3D Bioprinting",
    subtitle: "Printing living tissues with cell 'ink'",
    relatedTopics: [
      { no: 3, name: "Cellular Organisation" },
      { no: 15, name: "Growth and Development" },
      { no: 24, name: "Non-infectious Diseases and Disease Prevention" }
    ],
    coreConcepts: [
      "3D bioprinting uses 'bioink' made of living cells and biomaterials to print tissues layer by layer.",
      "The printed structure can act as a scaffold, allowing cells to grow and differentiate into the target tissue.",
      "Applications include printing skin, cartilage, blood vessels and miniature tissues for drug testing.",
      "Combined with stem cell technology and imaging data, personalised tissues can be tailor-made.",
      "Challenges include vascularisation, cell survival rate and long-term function."
    ],
    concept: "3D bioprinting combines additive manufacturing with cell biology: 'bioink' containing living cells is stacked layer by layer to build tissues with a three-dimensional structure, such as skin or cartilage. It holds promise for manufacturing transplantable tissues and even organs, and for providing drug-testing models closer to reality, although establishing a vascular network remains the biggest difficulty.",
    sourceUrl: "https://www.nibib.nih.gov/science-education/science-topics/bioprinting",
    mcqs: [
      { q: "What does the 'bioink' of 3D bioprinting contain?", options: ["Living cells and biomaterials", "Plastic pellets", "Cement", "Ordinary ink dye"], correct: 0, reasons: ["Correct answer", "Bioink contains living cells and biomaterials.", "Plastic pellets are bad for cell survival.", "Cement is not a biomaterial.", "Ordinary dye contains no living cells."] },
      { q: "What is the main application of 3D bioprinting?", options: ["Printing tissues such as skin, cartilage and blood vessels", "Printing computers", "Printing food", "Printing houses"], correct: 0, reasons: ["Correct answer", "Bioprinting manufactures biological tissues.", "Computers are not biological tissue.", "Food printing is another technology.", "Houses are not biological tissue."] },
      { q: "With which technology can bioprinting tailor-make tissues?", options: ["Stem cell technology and imaging data", "Brewing technology", "Astronomy", "Meteorology"], correct: 0, reasons: ["Correct answer", "Stem cells and imaging data allow personalised tissues.", "Brewing is unrelated to tissue manufacture.", "Astronomy is unrelated.", "Meteorology is unrelated."] },
      { q: "What is the biggest challenge of bioprinting?", options: ["Vascularisation and cell survival", "The ink being too expensive", "Printing too fast", "No cells being available"], correct: 0, reasons: ["Correct answer", "Building a vascular network to supply nutrients is the difficulty.", "Cost is not the biggest difficulty.", "Printing fast is not a problem.", "Cell sources can be obtained."] },
      { q: "What can bioprinted tissues be used for?", options: ["Transplantable tissues and drug-testing models", "Burning for energy", "Construction materials", "Textiles for clothing"], correct: 0, reasons: ["Correct answer", "Printed tissues are used for transplantation and drug testing.", "Biological tissues are not used as fuel.", "Biological tissues are not construction materials.", "Biological tissues are not clothing."] }
    ]
  },
  {
    title: "Liquid Biopsy",
    subtitle: "A non-invasive method of detecting cancer with blood",
    relatedTopics: [
      { no: 24, name: "Non-infectious Diseases and Disease Prevention" },
      { no: 26, name: "Basic Genetics" },
      { no: 27, name: "Molecular Genetics" }
    ],
    coreConcepts: [
      "Liquid biopsy detects tumour DNA (circulating tumour DNA, ctDNA) or circulating tumour cells from body fluids such as blood.",
      "When cancer cells die, they release DNA fragments into the blood, which can be detected and analysed for genetic mutations.",
      "It is less invasive than traditional tissue biopsy and can be repeated to monitor treatment response.",
      "Applications include early cancer screening, tracking tumour recurrence and guiding targeted therapy.",
      "Highly sensitive technology is needed to capture the very small amounts of tumour DNA."
    ],
    concept: "Liquid biopsy lets us 'see' a tumour with just a blood sample: circulating tumour DNA released by tumour cells carries cancer-related mutations and can be detected by highly sensitive sequencing. Compared with surgical biopsy, it is safer and repeatable, and can be used for early cancer screening, monitoring treatment and detecting recurrence early, opening a new era of 'detecting cancer by a blood test'.",
    sourceUrl: "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/liquid-biopsy",
    mcqs: [
      { q: "What does liquid biopsy mainly detect?", options: ["Circulating tumour DNA or tumour cells in the blood", "Red blood cells in the blood", "Salts in the urine", "Water in the sweat"], correct: 0, reasons: ["Correct answer", "Liquid biopsy detects ctDNA or circulating tumour cells.", "Red blood cells are not the target.", "Salts are not the target.", "Water is not the target."] },
      { q: "How does circulating tumour DNA enter the blood?", options: ["DNA fragments released when cancer cells die", "Mass division of normal cells", "DNA from food", "DNA made by drugs"], correct: 0, reasons: ["Correct answer", "Tumour cells release DNA upon apoptosis or necrosis.", "Division of normal cells does not produce ctDNA.", "Food DNA does not enter the blood as ctDNA.", "Drugs do not make DNA."] },
      { q: "What is the advantage of liquid biopsy over traditional tissue biopsy?", options: ["It is less invasive and can be repeated", "It is extremely expensive and dangerous", "It requires major surgery", "It can only be done once"], correct: 0, reasons: ["Correct answer", "It only needs a blood draw and can be repeated.", "Liquid biopsy is cheaper and safer.", "It needs no major surgery.", "It can be repeated."] },
      { q: "Which of the following is NOT an application of liquid biopsy?", options: ["Diagnosing fractures", "Early cancer screening", "Tracking tumour recurrence", "Guiding targeted therapy"], correct: 0, reasons: ["Correct answer", "Fractures do not need liquid biopsy.", "Early screening is an application.", "Tracking recurrence is an application.", "Guiding targeted therapy is an application."] },
      { q: "What is the challenge faced by liquid biopsy?", options: ["Needing high sensitivity to capture very small amounts of tumour DNA", "There being no DNA in the blood at all", "Tumours not releasing DNA", "Needing no technology"], correct: 0, reasons: ["Correct answer", "ctDNA is extremely scarce and needs highly sensitive technology.", "Blood contains DNA from normal cells.", "Tumours do release ctDNA.", "Liquid biopsy needs advanced sequencing technology."] }
    ]
  },
  {
    title: "Immune Checkpoint Inhibitors",
    subtitle: "Releasing the immune system's brake to fight cancer",
    relatedTopics: [
      { no: 25, name: "Body Defence Mechanisms" },
      { no: 28, name: "Biotechnology" }
    ],
    coreConcepts: [
      "Immune checkpoints are 'brake' proteins on immune cells (such as PD-1) that prevent the immune system from attacking normal cells.",
      "Cancer cells can use molecules such as PD-L1 to 'brake' T cells and escape immune attack.",
      "Immune checkpoint inhibitors (such as PD-1 inhibitors) block this interaction, releasing T cells to attack cancer cells.",
      "They are a major breakthrough in cancer immunotherapy, effective against melanoma and lung cancer.",
      "They may cause autoimmune-related side effects."
    ],
    concept: "Immune checkpoint inhibitors are revolutionary drugs in cancer immunotherapy: cancer cells often bind PD-L1 to the PD-1 of T cells, like pressing the immune system's 'brake' to escape attack. When inhibitors block this pair of molecules, T cells are 'reactivated' to attack the tumour. This turns the idea of 'using the body's own immunity against cancer cells' into reality, but may also trigger autoimmune side effects.",
    sourceUrl: "https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/checkpoint-inhibitors",
    mcqs: [
      { q: "What is the normal function of the immune checkpoint PD-1?", options: ["Preventing the immune system from over-attacking normal cells", "Promoting the growth of cancer cells", "Producing antibodies", "Breaking down toxins"], correct: 0, reasons: ["Correct answer", "PD-1 suppresses immune responses to protect normal cells.", "PD-1 does not promote cancer growth.", "Producing antibodies is the function of plasma cells.", "Breaking down toxins is unrelated to PD-1."] },
      { q: "How do cancer cells escape the immune system?", options: ["Using PD-L1 to bind the PD-1 of T cells, suppressing the immune response", "Releasing large amounts of oxygen", "Producing antibodies", "Being wrapped in a fat layer"], correct: 0, reasons: ["Correct answer", "PD-L1 binding to PD-1 suppresses T cells.", "Releasing oxygen cannot escape immunity.", "Cancer cells do not produce antibodies against themselves.", "A fat wrapping is not the main mechanism."] },
      { q: "What is the role of immune checkpoint inhibitors?", options: ["Blocking the PD-1/PD-L1 interaction and activating T cells to attack cancer cells", "Killing all T cells", "Increasing the number of cancer cells", "Lowering the immune response"], correct: 0, reasons: ["Correct answer", "Inhibitors release the brake and activate T cells.", "Inhibitors do not kill T cells.", "Inhibitors reduce cancer cells.", "Inhibitors enhance the immune response."] },
      { q: "For which cancers are immune checkpoint inhibitors effective?", options: ["Melanoma and lung cancer", "Fractures", "Short-sightedness", "The common cold"], correct: 0, reasons: ["Correct answer", "Checkpoint inhibitors are effective against melanoma, lung cancer and others.", "Fractures are not cancer.", "Short-sightedness is not cancer.", "The common cold is a viral infection, not this treatment."] },
      { q: "What are the possible side effects of immune checkpoint inhibitors?", options: ["Autoimmune-related side effects", "No side effects at all", "Increasing cancer cells", "Stopping the immune system completely"], correct: 0, reasons: ["Correct answer", "Releasing the brake may cause autoimmune reactions.", "The drugs have side-effect risks.", "The drugs reduce cancer cells.", "The drugs activate, not stop, the immune system."] }
    ]
  },
  {
    title: "Genetic Databases and Privacy",
    subtitle: "The challenges of storing and using genetic data",
    relatedTopics: [
      { no: 26, name: "Basic Genetics" },
      { no: 27, name: "Molecular Genetics" },
      { no: 30, name: "Origin of Life and Evidence of Evolution" }
    ],
    coreConcepts: [
      "Genetic databases store the DNA sequences of many individuals for medical research and disease risk assessment.",
      "Databases can accelerate the diagnosis of rare diseases and drug development (such as UK Biobank and All of Us).",
      "Forensic databases use DNA fingerprints to help identify individuals (Chapter 28).",
      "Genetic data are highly sensitive and may reveal health risks for individuals and their relatives.",
      "A balance must be struck between research value and data privacy, consent and fairness."
    ],
    concept: "Genetic databases bring together the DNA data of hundreds of thousands of people, allowing scientists to find associations between diseases and genetic variants and accelerate precision medicine. However, once genetic data leak out, they may affect the insurance, employment and privacy of individuals and their families. Informed consent, de-identification and strict privacy protection are therefore key to whether a genetic database can be trusted.",
    sourceUrl: "https://www.genome.gov/about-genomics/policy-issues/privacy",
    mcqs: [
      { q: "What is the main use of genetic databases?", options: ["Storing DNA data to accelerate medical research", "Storing food", "Measuring the weather", "Making plastic"], correct: 0, reasons: ["Correct answer", "Databases are used for medical research and risk assessment.", "Storing food is unrelated.", "Measuring weather is unrelated.", "Making plastic is unrelated."] },
      { q: "Where does the special sensitivity of genetic data come from?", options: ["It may reveal health risks for individuals and their relatives", "The data contain no information", "It affects only animals", "DNA cannot be stored"], correct: 0, reasons: ["Correct answer", "Genetic data involve health risks for individuals and relatives.", "Genetic data are rich in information.", "Genetic data concern humans.", "DNA can be stored."] },
      { q: "What ethical issues do genetic databases involve?", options: ["Privacy, consent and fairness", "Computers being too slow", "Too little data", "Too few scientists"], correct: 0, reasons: ["Correct answer", "Privacy, consent and fairness are core ethical issues.", "Computing speed is not an ethical issue.", "The large data scale is a feature.", "The number of scientists is not an ethical issue."] },
      { q: "What do forensic databases use to identify individuals?", options: ["DNA fingerprints", "The colour of fingerprints", "Height", "Shoe size"], correct: 0, reasons: ["Correct answer", "DNA fingerprints can identify individuals.", "Fingerprint colour cannot identify individuals.", "Height is not a unique marker.", "Shoe size is not a unique marker."] },
      { q: "What measures protect genetic data?", options: ["Informed consent and de-identification", "Making all data public", "Deleting all research", "Providing no protection"], correct: 0, reasons: ["Correct answer", "Consent and de-identification protect privacy.", "Making data public leaks privacy.", "Deleting research is unnecessary.", "Protection measures must be in place."] }
    ]
  },
  {
    title: "Bioremediation",
    subtitle: "Green technology that degrades pollutants with organisms",
    relatedTopics: [
      { no: 20, name: "Ecosystem" },
      { no: 36, name: "Human Impact on the Environment" },
      { no: 37, name: "Pollution Control and Conservation" }
    ],
    coreConcepts: [
      "Bioremediation uses micro-organisms (or plants) to break down or remove pollutants from the environment.",
      "Decomposers (bacteria and fungi) can break down organic pollutants into non-toxic substances (Chapter 20).",
      "Phytoremediation uses plants to absorb heavy metals or degrade pollutants.",
      "Applications include cleaning up oil spills, treating industrial wastewater and restoring contaminated soil.",
      "It is more environmentally friendly and cheaper than chemical or physical methods, but slower."
    ],
    concept: "Bioremediation makes use of the natural abilities of micro-organisms and plants to 'clean the environment': for example, bacteria that degrade oil are used to clean up spills, or hyperaccumulator plants absorb heavy metals from the soil. Compared with incineration or chemical treatment, it is a lower-carbon and cheaper green technology, although degradation is slower and suitable micro-organisms and environmental conditions are required.",
    sourceUrl: "https://www.epa.gov/remedytech/remediation-technologies-cleanup-contaminated-sites",
    mcqs: [
      { q: "What does bioremediation mainly use to degrade pollutants?", options: ["Micro-organisms and plants", "Strong acids", "High-temperature incineration", "Ionising radiation"], correct: 0, reasons: ["Correct answer", "Bioremediation uses organisms to degrade pollutants.", "Strong acids are chemical treatment.", "Incineration is physical–chemical treatment.", "Radiation is not bioremediation."] },
      { q: "What is the role of decomposers in bioremediation?", options: ["Breaking down organic pollutants into non-toxic substances", "Producing more pollutants", "Absorbing sunlight", "Making heavy metals"], correct: 0, reasons: ["Correct answer", "Decomposers degrade organic pollutants.", "Decomposers reduce, not produce, pollutants.", "Absorbing sunlight is photosynthesis.", "Decomposers do not make heavy metals."] },
      { q: "What is an application of phytoremediation?", options: ["Absorbing heavy metals or degrading pollutants", "Increasing environmental pollution", "Making plastic", "Replacing forests"], correct: 0, reasons: ["Correct answer", "Hyperaccumulator plants can absorb heavy metals.", "Phytoremediation aims to clean rather than pollute.", "Making plastic is unrelated.", "Phytoremediation does not replace forests."] },
      { q: "What is the advantage of bioremediation?", options: ["Environmentally friendly and cheaper", "Extremely fast with immediate results", "Producing large amounts of toxic by-products", "Needing large amounts of chemicals"], correct: 0, reasons: ["Correct answer", "Bioremediation is greener and cheaper.", "Bioremediation is slower.", "Bioremediation produces fewer by-products.", "Bioremediation needs few chemicals."] },
      { q: "What is the limitation of bioremediation?", options: ["Degradation is relatively slow", "It cannot treat any pollutants", "It can only be carried out in the sea", "It needs no micro-organisms"], correct: 0, reasons: ["Correct answer", "Biological degradation takes time.", "Bioremediation can treat many pollutants.", "Soil on land can also be remediated.", "Bioremediation needs micro-organisms or plants."] }
    ]
  },
  {
    title: "Assisted Reproductive Technology and IVF",
    subtitle: "Using technology to assist conception and screen embryos",
    relatedTopics: [
      { no: 14, name: "Reproduction in Humans" },
      { no: 35, name: "Hormonal Control of Reproductive Cycle" }
    ],
    coreConcepts: [
      "In vitro fertilisation (IVF) fertilises eggs with sperm outside the body and then transfers the embryo into the uterus (Chapter 14).",
      "Before treatment, hormones (FSH/LH) stimulate the ovaries to collect multiple mature eggs (Chapter 35).",
      "Preimplantation genetic testing (PGT) can screen embryos for genetic diseases.",
      "Applications include blocked fallopian tubes, male infertility and genetic disease risk.",
      "It raises ethical issues such as the status of the embryo, the disposal of surplus embryos and the risk of multiple pregnancies."
    ],
    concept: "IVF moves fertilisation from inside the body to outside: hormones first stimulate the ovaries to obtain eggs, which are fertilised with sperm in a culture dish to form embryos, and healthy embryos are then selected and transferred into the uterus. Combined with preimplantation genetic testing, it can reduce the risk of genetic diseases and bring hope to infertile couples, while also triggering ethical debates about the moral status of embryos.",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/infertility",
    mcqs: [
      { q: "What is the process of in vitro fertilisation (IVF)?", options: ["Eggs are fertilised with sperm outside the body and the embryo is transferred into the uterus", "Fertilisation directly in the uterus", "Only injecting sperm into the vagina", "Involving no fertilisation at all"], correct: 0, reasons: ["Correct answer", "IVF fertilises outside the body and then transfers the embryo.", "Fertilisation in the uterus is natural conception.", "Injecting sperm is artificial insemination, not IVF.", "IVF always involves fertilisation."] },
      { q: "Why are hormones used before IVF treatment?", options: ["To stimulate the ovaries to collect multiple mature eggs", "To suppress ovulation", "To stop the eggs developing", "To increase uterine contractions"], correct: 0, reasons: ["Correct answer", "Hormones stimulate follicle development to collect multiple eggs.", "The purpose is to obtain multiple eggs.", "Hormones promote, not stop, egg development.", "Hormones are not used to increase contractions."] },
      { q: "What is preimplantation genetic testing (PGT) used for?", options: ["Screening embryos for genetic diseases", "Changing the sex of the embryo", "Increasing the number of embryos", "Enlarging the embryo"], correct: 0, reasons: ["Correct answer", "PGT detects genetic abnormalities in embryos.", "PGT does not change sex.", "PGT does not increase embryo number.", "PGT does not enlarge embryos."] },
      { q: "What are the applications of IVF?", options: ["Blocked fallopian tubes and infertility", "Fractures", "Short-sightedness", "The common cold"], correct: 0, reasons: ["Correct answer", "IVF is used to treat infertility.", "Fractures are not a reproductive problem.", "Short-sightedness is not a reproductive problem.", "The common cold is not a reproductive problem."] },
      { q: "What ethical issues are involved in assisted reproductive technology?", options: ["The status of the embryo and the disposal of surplus embryos", "No ethical issues at all", "The technology being too outdated", "No informed consent being needed"], correct: 0, reasons: ["Correct answer", "Embryo status and surplus embryos are ethical issues.", "Assisted reproduction involves ethical debate.", "The technology is advanced, not outdated.", "Informed consent must be obtained."] }
    ]
  },
  {
    title: "Telomeres and Ageing Research",
    subtitle: "The life timer at the ends of chromosomes",
    relatedTopics: [
      { no: 12, name: "Cell Cycle and Cell Division" },
      { no: 15, name: "Growth and Development" },
      { no: 26, name: "Basic Genetics" }
    ],
    coreConcepts: [
      "Telomeres are repeated DNA sequences at the ends of chromosomes that protect them from damage (Chapter 12).",
      "With each cell division the telomeres shorten; when they reach a limit, the cell stops dividing (ageing).",
      "Telomerase can lengthen telomeres and is more active in stem cells and cancer cells.",
      "Telomere length is related to research on ageing, cancer and lifespan.",
      "Telomere shortening is regarded as a biomarker of cellular ageing."
    ],
    concept: "Telomeres are like the 'protective caps' at the ends of shoelaces: made of repeated DNA sequences, they protect chromosomes from damage during replication. With each division the telomeres shorten a little, and when they reach a limit the cell enters a senescent state; telomerase can lengthen telomeres in stem cells. Studying telomeres helps us understand the ageing process and the mechanisms of cancer.",
    sourceUrl: "https://www.genome.gov/genetics-glossary/Telomere",
    mcqs: [
      { q: "Where are telomeres located on chromosomes?", options: ["At the ends", "In the middle", "At the centromere", "On the cell membrane"], correct: 0, reasons: ["Correct answer", "Telomeres are at both ends of chromosomes.", "The middle is not the telomere position.", "The centromere links sister chromatids.", "The cell membrane is not a chromosome structure."] },
      { q: "What is the main function of telomeres?", options: ["Protecting chromosomes from damage", "Storing energy", "Synthesising proteins", "Transporting oxygen"], correct: 0, reasons: ["Correct answer", "Telomeres protect the ends of chromosomes.", "Storing energy is unrelated.", "Synthesising proteins is the ribosome.", "Transporting oxygen is the red blood cell."] },
      { q: "After each cell division, what happens to telomeres?", options: ["They shorten", "They lengthen", "They stay the same", "They disappear immediately"], correct: 0, reasons: ["Correct answer", "The ends cannot be fully replicated and shorten at each division.", "Telomeres do not lengthen.", "Telomeres shorten.", "Telomeres do not disappear immediately."] },
      { q: "What is the role of telomerase?", options: ["Lengthening telomeres", "Shortening telomeres", "Damaging chromosomes", "Synthesising proteins"], correct: 0, reasons: ["Correct answer", "Telomerase lengthens telomeres using an RNA template.", "Telomerase lengthens, not shortens, telomeres.", "Telomerase does not damage chromosomes.", "Telomerase does not synthesise proteins."] },
      { q: "Telomere shortening is related to what?", options: ["Cellular ageing", "Cells turning green", "An increase in chromosome number", "Cell immortality"], correct: 0, reasons: ["Correct answer", "Telomere shortening is linked to cellular ageing.", "Cells do not turn green.", "Telomeres are unrelated to chromosome number.", "Telomere shortening causes ageing, not immortality."] }
    ]
  }
];
