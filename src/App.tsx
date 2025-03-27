import { useState } from 'react'
import { translateDnaToRna, translateRnaToProtein } from './utils/translator'
import './App.css'

function App() {
  const [dnaSequence, setDnaSequence] = useState('')
  const [rnaSequence, setRnaSequence] = useState('')
  const [proteinSequence, setProteinSequence] = useState('')
  const [error, setError] = useState('')
  const [codons, setCodons] = useState<string[]>([])
  const [aminoAcids, setAminoAcids] = useState<string[]>([])

  const handleTranslate = () => {
    try {
      setError('')
      const rna = translateDnaToRna(dnaSequence)
      setRnaSequence(rna)
      
      const { codons: rnaCodons, aminoAcids: acids } = translateRnaToProtein(rna)
      setCodons(rnaCodons)
      setAminoAcids(acids)
      setProteinSequence(acids.filter(aa => aa !== "STOP").join(' '))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao traduzir a sequência')
    }
  }

  return (
    <div className="app">
      <h1>Tradutor DNA → RNA → Proteína</h1>
      <div className="card">
        <div className="input-section">
          <label htmlFor="dna-input">Sequência de DNA:</label>
          <input
            id="dna-input"
            type="text"
            value={dnaSequence}
            onChange={(e) => setDnaSequence(e.target.value.toUpperCase())}
            placeholder="Digite a sequência de DNA (ex: ATGC)"
            className="sequence-input"
          />
          <button onClick={handleTranslate} className="translate-button">
            Traduzir
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {rnaSequence && (
          <div className="result-section">
            <h2>Resultados:</h2>
            <div className="result-box">
              <h3>RNA:</h3>
              <p className="sequence">{rnaSequence}</p>
            </div>
            <div className="result-box">
              <h3>Códons:</h3>
              <p className="sequence">{codons.join(' ')}</p>
            </div>
            <div className="result-box">
              <h3>Aminoácidos:</h3>
              <p className="sequence">{aminoAcids.join(' ')}</p>
            </div>
            <div className="result-box">
              <h3>Proteína:</h3>
              <p className="sequence">{proteinSequence}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App 