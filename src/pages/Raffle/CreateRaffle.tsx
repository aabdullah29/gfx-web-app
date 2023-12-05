import React, { ReactElement, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'
import 'styled-components/macro'

const Wrapper = styled.div`
  input {
    ${tw`border border-gray-400 rounded m-1 bg-grey-1 font-semibold text-grey-4`}
  }
  select {
    ${tw`border border-gray-400 rounded m-1 bg-grey-1 font-semibold text-grey-4`}
  }
`
const CreateRaffle = (): ReactElement => {
  const [formData, setFormData] = useState({
    contestType: 'PERPS',
    contestId: '',
    contestStartTimestamp: '',
    contestEndTimestamp: '',
    contestClaimPrizeEnabled: false,
    totalPointsWeight: '',
    contestPointsWeight: '',
    fixedPrizes: {
      numPrizes: '',
      tokenName: '',
      tokenMint: '',
      prizeSplit: [],
      totalFixedPrize: ''
    },
    rafflePrizes: {
      numPrizes: '',
      tokenName: '',
      tokenMint: '',
      totalRafflePrize: ''
    },
    contestStatus: 'UPCOMING'
  })

  const tokenMintOptions = {
    GOFX: 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD',
    USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'
    // Add more options as needed
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('fixedPrizes.') || name.startsWith('rafflePrizes.')) {
      if (name.includes('tokenName')) {
        const [key, subKey] = name.split('.')

        setFormData((prevState) => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            [subKey]: value,
            [subKey.replace('tokenName', 'tokenMint')]: tokenMintOptions[value]
          }
        }))
        return
      }
      const [key, subKey] = name.split('.')
      setFormData((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [subKey]: value
        }
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  console.log(formData.fixedPrizes.tokenMint)

  const validateForm = () => {
    // Check top-level fields
    const requiredFields = [
      'contestType',
      'contestId',
      'contestStartTimestamp',
      'contestEndTimestamp',
      'totalPointsWeight',
      'contestPointsWeight',
      'contestStatus'
    ]
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill out the ${field} field.`)
        return false
      }
    }

    // Check nested fields in fixedPrizes
    const fixedPrizesFields = ['numPrizes', 'tokenName', 'tokenMint', 'prizeSplit', 'totalFixedPrize']
    for (const field of fixedPrizesFields) {
      if (!formData.fixedPrizes[field]) {
        alert(`Please fill out the Fixed Prizes ${field} field.`)
        return false
      }
    }

    // Check nested fields in rafflePrizes
    const rafflePrizesFields = ['numPrizes', 'tokenName', 'tokenMint', 'totalRafflePrize']
    for (const field of rafflePrizesFields) {
      if (!formData.rafflePrizes[field]) {
        alert(`Please fill out the Raffle Prizes ${field} field.`)
        return false
      }
    }

    // Add more checks as needed for other nested objects or arrays

    return true
  }

  const saveDataToDb = () => {
    if (!validateForm()) {
      return
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Here you would typically send the data to your backend
  }

  return (
    <Wrapper>
      <h1>Contest Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contest Type:</label>
          <input type="text" name="contestType" value={formData.contestType} onChange={handleChange} />
        </div>
        <div>
          <label>Contest ID:</label>
          <input type="number" name="contestId" value={formData.contestId} onChange={handleChange} />
        </div>
        <div>
          <label>Contest Start Timestamp:</label>
          <input
            type="number"
            name="contestStartTimestamp"
            value={formData.contestStartTimestamp}
            onChange={handleChange}
          />
          <a href="https://www.epochconverter.com/" target="_blank" rel="noopener noreferrer">
            {' '}
            Epoch Converter
          </a>
        </div>
        <div>
          <label>Contest End Timestamp:</label>
          <input
            type="number"
            name="contestEndTimestamp"
            value={formData.contestEndTimestamp}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Total Points Weight:</label>
          <input
            type="number"
            name="totalPointsWeight"
            value={formData.totalPointsWeight}
            onChange={handleChange}
          />
          <label>Ex: 25</label>
        </div>
        <div>
          <label>Contest Points Weight:</label>
          <input
            type="number"
            name="contestPointsWeight"
            value={formData.contestPointsWeight}
            onChange={handleChange}
          />
          <label>Ex: 75</label>
        </div>
        <h2>Fixed Prizes</h2>
        <div>
          <label>Number of Prizes:</label>
          <input
            type="number"
            name="fixedPrizes.numPrizes"
            value={formData.fixedPrizes.numPrizes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Token Name:</label>
          <select name="fixedPrizes.tokenName" value={formData.fixedPrizes.tokenName} onChange={handleChange}>
            <option value="">Select a Token</option>
            <option value="GOFX">GOFX</option>
            <option value="USDC">USDC</option>
            <option value="BONK">BONK</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>Token Mint:</label>
          <input
            type="text"
            name="fixedPrizes.tokenMint"
            value={tokenMintOptions[formData.fixedPrizes.tokenName]}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Prize Split:</label>
          <label>Ex [50, 20, 10]:</label>
          <input
            type="text"
            name="fixedPrizes.prizeSplit"
            value={formData.fixedPrizes.prizeSplit}
            onChange={handleChange}
            placeholder="Enter comma-separated values"
          />
        </div>
        <div>
          <label>Total Fixed Prize:</label>
          <input
            type="number"
            name="fixedPrizes.totalFixedPrize"
            value={formData.fixedPrizes.totalFixedPrize}
            onChange={handleChange}
          />
        </div>
        <h2>Raffle Prizes</h2>
        <div>
          <label>Number of Prizes:</label>
          <input
            type="number"
            name="rafflePrizes.numPrizes"
            value={formData.rafflePrizes.numPrizes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Token Name:</label>
          <select name="rafflePrizes.tokenName" value={formData.rafflePrizes.tokenName} onChange={handleChange}>
            <option value="">Select a Token</option>
            <option value="GOFX">GOFX</option>
            <option value="USDC">USDC</option>
            <option value="BONK">BONK</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>Token Mint:</label>
          <input
            type="text"
            name="rafflePrizes.tokenMint"
            value={tokenMintOptions[formData.rafflePrizes.tokenName]}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Total Raffle Prize:</label>
          <input
            type="number"
            name="rafflePrizes.totalRafflePrize"
            value={formData.rafflePrizes.totalRafflePrize}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contest Status:</label>
          <input type="text" name="contestStatus" value={formData.contestStatus} onChange={handleChange} />
        </div>
        <button onClick={saveDataToDb} tw="p-2 border-solid bg-gradient-1 text-lg font-semibold" type="submit">
          Submit
        </button>
      </form>
    </Wrapper>
  )
}

export default CreateRaffle
