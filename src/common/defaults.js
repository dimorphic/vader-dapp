import { ethers } from 'ethers'
import tokenListSources from '../tokenListSources.json'

const defaults = {}

defaults.network = {}
defaults.network.connector = undefined
defaults.network.chainId = Number(process.env.REACT_APP_CHAIN_ID)
defaults.network.provider = new ethers.providers.FallbackProvider(
	[
		{
			provider: new ethers.providers.AlchemyProvider(
				defaults.network.chainId,
				process.env.REACT_APP_ALCHEMY_KEY,
			),
			weight: 1,
			priority: 1,
			stallTimeout: 2000,
		},
		{
			provider: new ethers.providers.InfuraProvider(
				defaults.network.chainId,
				process.env.REACT_APP_INFURA_KEY,
			),
			weight: 1,
			priority: 2,
			stallTimeout: 2000,
		},
	],
	1,
)

defaults.api = {}
defaults.api.graphUrl = 'https://api.thegraph.com/subgraphs/name/satoshi-naoki/vader-protocol'

defaults.layout = {}

defaults.layout.header = {}
defaults.layout.header.width = '100%'
defaults.layout.header.padding = '1.2rem 1rem'
defaults.layout.header.minHeight = '98.4px'

defaults.layout.container = {}
defaults.layout.container.lg = {}
defaults.layout.container.lg.width = '75rem'
defaults.layout.container.lg.padding = { base: '0 1.25rem', md: '0 2.5rem' }
defaults.layout.container.md = {}
defaults.layout.container.md.width = '840px'
defaults.layout.container.sm = {}
defaults.layout.container.sm.width = '768px'

defaults.toast = {}
defaults.toast.duration = 5000
defaults.toast.closable = true
defaults.toast.position = 'top'

defaults.address = {}
defaults.address.vader = (
	defaults.network.chainId === 1 ? '' :
		defaults.network.chainId === 42 ? '0x1E6F42f04D64D55ec08d6D4e6A7CB4a235E1c742' :
			undefined
)
defaults.address.vether = (
	defaults.network.chainId === 1 ? '0x4Ba6dDd7b89ed838FEd25d208D4f644106E34279' :
		defaults.network.chainId === 42 ? '0x438f70ab08ab3f74833c439643c3fc1939ce2929' :
			undefined
)
defaults.address.converter = (
	defaults.network.chainId === 1 ? '' :
		defaults.network.chainId === 42 ? '0x8e7A48fC00cF9541392FB820628Ca730b6badf3e' :
			undefined
)
defaults.address.pool = (
	defaults.network.chainId === 1 ? '' :
		defaults.network.chainId === 42 ? '0x795bE6b0BF54AF587385604B9DB869E797db69E0' :
			undefined
)

defaults.tokenList = {}
defaults.tokenList.default = 'https://raw.githubusercontent.com/vetherasset/vader-tokens/master/index.json'
defaults.tokenList.sources = tokenListSources

defaults.tokenDefault = {
	'chainId': defaults.network.chainId,
	'address': defaults.network.chainId === 1 ? '' :
		defaults.network.chainId === 42 ? '0xE90E0A75694Fc97576868243AD0364d10291f48A' :
			undefined,
	'name': 'USDV',
	'symbol': 'USDV',
	'decimals': 6,
	'logoURI': 'https://assets.coingecko.com/coins/images/11375/thumb/vether-symbol-coingecko.png?1622341592',
}

defaults.redeemables = [
	{
		'chainId':defaults.network.chainId,
		'address':defaults.address.vether,
		'name':'VETHER',
		'symbol':'VETH',
		'decimals':18,
		'logoURI':'https://assets.coingecko.com/coins/images/11375/thumb/vether-symbol-coingecko.png?1622341592',
		'convertsTo':'VADER',
	},
]

defaults.vader = {}
defaults.vader.conversionRate = 1000

defaults.graphUrl = 'https://api.thegraph.com/subgraphs/name/satoshi-naoki/vader-protocol'

export default defaults
