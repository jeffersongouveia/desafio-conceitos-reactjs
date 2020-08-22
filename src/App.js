import React, { useEffect, useState } from 'react'

import api from './services/api'

import './styles.css'

function App() {
  const [count, setCount] = useState(1)
  const [repositories, setRepositories] = useState([])

  function getRepositories() {
    api.get('/repositories')
      .then(({ data }) => setRepositories(data))
      .catch(console.error)
  }

  useEffect(getRepositories, [])

  async function handleAddRepository() {
    const params = {
      title: `Repositório ${count}`,
      url: 'https://github.com/jeffersongouveia/desafio-conceitos-reactjs',
      techs: ['JavaScript', 'CSS', 'HTML', 'ReactJS', 'Node.js'],
    }

    const { data } = await api.post('/repositories', params)

    setRepositories([...repositories, data])
    setCount(count + 1)
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).catch(console.error)

    const newRepositories = repositories.filter((r) => r.id !== id)
    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button
                onClick={() => handleRemoveRepository(repository.id)}
              >
                Remover
              </button>
            </li>
          )
        )}
      </ul>

      <button onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  )
}

export default App
