// Translates DNA sequence to RNA
export function translateDnaToRna(dnaSequence: string): string {
    // Validate input (only A, T, G, C characters)
    const dnaSeq = dnaSequence.toUpperCase();
    const validBases = new Set(['A', 'T', 'G', 'C']);
    
    // Check if all characters are valid DNA bases
    if (![...dnaSeq].every(base => validBases.has(base))) {
        throw new Error('Sequência de DNA inválida. Use apenas A, T, G, C.');
    }
    
    // Translation dictionary for DNA to RNA
    const translation: { [key: string]: string } = {
        'A': 'U',
        'T': 'A',
        'G': 'C',
        'C': 'G'
    };
    
    // Translate DNA to RNA
    return [...dnaSeq].map(base => translation[base]).join('');
}

// Separate RNA sequence into codons (triplets)
export function separateIntoCodons(rnaSequence: string): string[] {
    const codons: string[] = [];
    for (let i = 0; i < rnaSequence.length; i += 3) {
        codons.push(rnaSequence.slice(i, i + 3));
    }
    return codons;
}

// Genetic code mapping for RNA to protein translation
const geneticCode: { [key: string]: string } = {
    // First base U
    "UUU": "Phe", "UUC": "Phe", "UUA": "Leu", "UUG": "Leu",
    "CUU": "Leu", "CUC": "Leu", "CUA": "Leu", "CUG": "Leu",
    "AUU": "Ile", "AUC": "Ile", "AUA": "Ile", "AUG": "Met",
    "GUU": "Val", "GUC": "Val", "GUA": "Val", "GUG": "Val",
    
    // First base C
    "UCU": "Ser", "UCC": "Ser", "UCA": "Ser", "UCG": "Ser",
    "CCU": "Pro", "CCC": "Pro", "CCA": "Pro", "CCG": "Pro",
    "ACU": "Thr", "ACC": "Thr", "ACA": "Thr", "ACG": "Thr",
    "GCU": "Ala", "GCC": "Ala", "GCA": "Ala", "GCG": "Ala",
    
    // First base A
    "UAU": "Tyr", "UAC": "Tyr", "UAA": "STOP", "UAG": "STOP",
    "CAU": "His", "CAC": "His", "CAA": "Gln", "CAG": "Gln",
    "AAU": "Asn", "AAC": "Asn", "AAA": "Lys", "AAG": "Lys",
    "GAU": "Asp", "GAC": "Asp", "GAA": "Glu", "GAG": "Glu",
    
    // First base G
    "UGU": "Cys", "UGC": "Cys", "UGA": "STOP", "UGG": "Trp",
    "CGU": "Arg", "CGC": "Arg", "CGA": "Arg", "CGG": "Arg",
    "AGU": "Ser", "AGC": "Ser", "AGA": "Arg", "AGG": "Arg",
    "GGU": "Gly", "GGC": "Gly", "GGA": "Gly", "GGG": "Gly"
};

// Translate RNA to protein
export function translateRnaToProtein(rnaSequence: string): { codons: string[], aminoAcids: string[] } {
    // Separate RNA into codons
    const codons = separateIntoCodons(rnaSequence);
    
    // Translate each codon to corresponding amino acid
    const aminoAcids: string[] = [];
    
    for (const codon of codons) {
        // Check if codon has 3 bases (last might be incomplete)
        if (codon.length === 3) {
            const aminoAcid = geneticCode[codon] || "???";
            
            if (aminoAcid === "STOP") {
                aminoAcids.push(aminoAcid);
                break; // Stop translation when STOP codon is found
            }
            
            aminoAcids.push(aminoAcid);
        } else {
            aminoAcids.push(`Incompleto(${codon})`);
        }
    }
    
    return { codons, aminoAcids };
} 