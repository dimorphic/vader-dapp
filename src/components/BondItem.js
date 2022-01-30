import React from 'react'
import { useWallet } from 'use-wallet'
import { ethers } from 'ethers'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Flex, Image, Tag } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { prettifyCurrency, getPercentage, calculateDifference } from '../common/utils'
import { useBondInfo } from '../hooks/useBondInfo'
import { useUniswapV2Price } from '../hooks/useUniswapV2Price'
import defaults from '../common/defaults'
import { useBondPrice } from '../hooks/useBondPrice'

export const BondItem = (props) => {

	BondItem.propTypes = {
		address: PropTypes.string.isRequired,
		principal: PropTypes.object.isRequired,
		token0: PropTypes.object.isRequired,
		token1: PropTypes.object,
		payout: PropTypes.object.isRequired,
	}

	const wallet = useWallet()
	const { data: bondInfo } = useBondInfo(props.address, wallet.account, true)
	const [vaderEth] = useUniswapV2Price(props.principal.address)
	const [usdcEth] = useUniswapV2Price(defaults.address.uniswapV2.usdcEthPair)
	const [principalEth] = useUniswapV2Price(props.principal.address, true)
	const { data: price } = useBondPrice(props.address)
	const bondPirce = (Number(ethers.utils.formatUnits(price ? price : '0', 18)) *
	(Number(usdcEth?.pairs?.[0]?.token0Price) * Number(principalEth?.principalPrice)))
	const marketPrice = (Number(usdcEth?.pairs?.[0]?.token0Price) * Number(vaderEth?.pairs?.[0]?.token1Price))

	return (
		<>
			<Link to={`/bond/${props.address}`}>
				<Flex
					width='100%'
					alignItems='center'
					justifyContent='space-between'
					p={{ base: '12px 11px', md: '0 24px' }}
					minH='60px'
					cursor='pointer'
					animation={ bondInfo?.[1] && bondInfo?.[1]?.gt(0) ? '2.3s ease-in-out infinite bgAnimation' : '' }
					transition='all 0.3s ease 0s'
					background='rgba(244, 155, 202, 0.08) none repeat scroll 0% 0%'
					mb='16px'
					borderRadius='16px'
					border={ bondInfo?.[1] && bondInfo?.[1]?.gt(0) ? '1px solid #ffffff10' : '1px solid #ffffff08' }
					_hover={{
						cursor: 'pointer',
						background: 'rgba(244, 155, 202, 0.2) none repeat scroll 0% 0%',
						border: '1px solid #ffffff10',
					}}
				>
					<Flex
						alignItems={{ base: 'center' }}
						width={{ base: '54%', md: '' }}
						flexWrap={bondInfo?.[1] && bondInfo?.[1]?.gt(0) ? 'wrap' : '' }
						fontSize={{ base: '0.75rem', md: '1rem' }}
						fontWeight='bolder'>
						<Image
							width='23px'
							height='23px'
							borderRadius='50%'
							mr={{ base: '3px', md: '7px' }}
							src={props.token0?.logoURI}
							alt={`${props.token0?.name} token`}
						/>
						<Image
							width='23px'
							height='23px'
							borderRadius='50%'
							mr={{ base: '2px', md: '10px' }}
							src={props.token1?.logoURI}
							alt={`${props.token1?.name} token`}
						/>
						{props.token0?.symbol}{props.token1 ? ` / ${props.token1.symbol}` : ''}
						{bondInfo?.[1] && bondInfo?.[1]?.gt(0) &&
							<Tag
								fontSize={{ base: '0.67rem', md: '0.83rem' }}
								mt={{ base: '3px', md: '' }}
								ml='10px'
								borderRadius='11px'
								variant='subtle'
								colorScheme='cyan'>
								<CheckCircleIcon
									mr='5px'
								/> Purchased
							</Tag>
						}
					</Flex>
					<Flex
						flexDir='row'
						alignContent='flex-end'
						justifyContent='flex-end'
						gridGap='0.7rem'
					>
						{price && usdcEth?.pairs?.[0]?.token0Price && principalEth?.principalPrice &&
								<>
									<Tag
										fontSize={{ base: '0.67rem', md: '0.83rem' }}
										colorScheme='gray'>
										{prettifyCurrency(
											Number(ethers.utils.formatUnits(price, 18)) *
											(Number(usdcEth?.pairs?.[0]?.token0Price) * Number(principalEth?.principalPrice)),
											0, 5)}
									</Tag>
								</>
						}
						{isFinite(calculateDifference(marketPrice, bondPirce)) && calculateDifference(marketPrice, bondPirce) > 0 &&
							<Tag
								fontSize={{ base: '0.67rem', md: '0.83rem' }}
								colorScheme='gray'>
								{getPercentage(calculateDifference(marketPrice, bondPirce))}
							</Tag>
						}
					</Flex>
				</Flex>
			</Link>
		</>
	)
}