import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, NumberInput, NumberInputField, Input, Button, Image, useDisclosure,
	Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
} from '@chakra-ui/react'
import { FixedSizeList as List } from 'react-window'
import { TriangleDownIcon } from '@chakra-ui/icons'
import defaults from '../common/defaults'
import { searchFor } from '../common/utils'
import getTokenList from 'get-token-list'

const flex = {
	flex: '1',
}

const input = {
	variant: 'transparent',
}

const field = {
	fontSize: '1.8rem',
	fontWeight: 'bold',
}

const span = {
	fontSize: '0.7rem',
	opacity: '0.9',
}

const TokenSelectButton = ({ data, index, style }) => {
	TokenSelectButton.propTypes = {
		index: PropTypes.number.isRequired,
		style: PropTypes.object.isRequired,
		data: PropTypes.array.isRequired,
	}
	return (
		<Button
			variant='ghostSelectable'
			fontWeight='600'
			fontSize='1.2rem'
			justifyContent='left'
			p='2rem 1.5rem'
			style={style}
			key={index}>
			{data &&
			<>
				<Image
					width='42px'
					mr='10px'
					src={data[index].logoURI}
				/>
				{data[index].name}
			</>
			}
			{index}
		</Button>
	)
}

export const Swap = () => {

	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef()

	const [isSelect, setIsSelect] = useState(-1)
	const [tokenListDefault, setTokenListDefault] = useState(false)
	const tokenList = useMemo(() => tokenListDefault.tokens, [tokenListDefault])
	const [tokenListModified, setTokenListModified] = useState(false)

	useEffect(() => {
		getTokenList('https://raw.githubusercontent.com/vetherasset/vader-tokens/master/index.json')
			.then(data => setTokenListDefault(data))
			.catch(err => console.log(err))
		return () => setTokenListDefault(false)
	}, [])

	useEffect(() => {
		if (!isOpen) setIsSelect(-1)
	}, [isOpen])

	console.log(isSelect)
	console.log(tokenList)
	console.log(tokenListModified)

	return (
		<>
			<Box
				height={`calc(100vh - ${defaults.layout.header.minHeight})`}
				maxWidth={defaults.layout.container.sm.width}
				m='0 auto'
				pt='5rem'
			>
				<Flex
					maxW='49ch'
					m='0 auto'
					p='1.8rem'
					layerStyle='colorful'
					flexDir='column'
				>
					<Flex
						{...flex}
						mb='1.1rem'
						p='0 0.3rem'
						flexDir='row'
						justifyContent='space-between'
					>
						<Box as='h3' m='0' fontSize='xl' fontWeight='bold' textTransform='capitalize'>Swap</Box>
						<Box
							as='button'
							width='22px'
						>
							<Image m='0' height='22px' src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27.42047 27.42047'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fff;%7D%3C/style%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpath class='cls-1' d='M14.57066,27.42047h-1.7209a2.52716,2.52716,0,0,1-2.52429-2.52424V24.314a11.07024,11.07024,0,0,1-1.719-.71352l-.41259.41259a2.52427,2.52427,0,0,1-3.57028-.00038L3.40731,22.79648a2.52414,2.52414,0,0,1,.00033-3.57029l.41227-.41227a11.07,11.07,0,0,1-.71352-1.719H2.52424A2.52714,2.52714,0,0,1,0,14.57071v-1.721a2.52716,2.52716,0,0,1,2.52429-2.52424h.58215A11.0716,11.0716,0,0,1,3.82,8.60655L3.40737,8.194a2.52429,2.52429,0,0,1,.00032-3.57029L4.6241,3.40737a2.524,2.524,0,0,1,3.57023.00032l.41222.41222a11.0785,11.0785,0,0,1,1.719-.71352V2.52424A2.52712,2.52712,0,0,1,12.84981,0h1.7209A2.52711,2.52711,0,0,1,17.095,2.52424v.5822a11.06956,11.06956,0,0,1,1.719.71352l.41259-.41259a2.52428,2.52428,0,0,1,3.57029.00037L24.0131,4.624a2.52414,2.52414,0,0,1-.00032,3.57028l-.41227.41228a11.07152,11.07152,0,0,1,.71352,1.719h.58215a2.52716,2.52716,0,0,1,2.52429,2.52424v1.721A2.52716,2.52716,0,0,1,24.89618,17.095H24.314a11.074,11.074,0,0,1-.71352,1.719l.41259.41259a2.52429,2.52429,0,0,1-.00032,3.57029l-1.21641,1.21635a2.524,2.524,0,0,1-3.57023-.00032l-.41222-.41222a11.07931,11.07931,0,0,1-1.719.71352v.58221A2.5271,2.5271,0,0,1,14.57066,27.42047ZM8.87507,21.91334a9.46917,9.46917,0,0,0,2.45451,1.0189.80328.80328,0,0,1,.60261.77784v1.18615a.91866.91866,0,0,0,.91762.91757h1.7209a.91866.91866,0,0,0,.91762-.91757V23.71008a.80327.80327,0,0,1,.60261-.77784,9.46917,9.46917,0,0,0,2.45451-1.0189.8033.8033,0,0,1,.977.12345l.84018.84023A.91727.91727,0,0,0,21.66,22.8774l1.21716-1.21711a.91741.91741,0,0,0,.00032-1.29738l-.84055-.84056a.80336.80336,0,0,1-.12345-.977,9.46757,9.46757,0,0,0,1.01884-2.45451.80332.80332,0,0,1,.77784-.60255h1.1861a.91866.91866,0,0,0,.91762-.91757v-1.721a.91866.91866,0,0,0-.91762-.91756h-1.1861a.80335.80335,0,0,1-.77784-.60256,9.46944,9.46944,0,0,0-1.01884-2.4545.80338.80338,0,0,1,.12345-.977l.84023-.84023a.91726.91726,0,0,0,.00032-1.29738L21.6604,4.54355A.91737.91737,0,0,0,20.363,4.54322l-.8405.84056a.8033.8033,0,0,1-.977.12344A9.46949,9.46949,0,0,0,16.091,4.48833a.80328.80328,0,0,1-.6026-.77784V2.52423a.91867.91867,0,0,0-.91763-.91757h-1.7209a.91866.91866,0,0,0-.91762.91757V3.71038a.80328.80328,0,0,1-.60261.77784,9.46932,9.46932,0,0,0-2.45451,1.0189.80342.80342,0,0,1-.977-.12345l-.84018-.84023A.91727.91727,0,0,0,5.7606,4.54306L4.54344,5.76017a.91742.91742,0,0,0-.00032,1.29738l.84056.84056a.80337.80337,0,0,1,.12344.977,9.46743,9.46743,0,0,0-1.01884,2.45451.80332.80332,0,0,1-.77784.60255H2.52429a.91874.91874,0,0,0-.91762.91762v1.721a.91866.91866,0,0,0,.91762.91757H3.71038a.80334.80334,0,0,1,.77785.60255,9.469,9.469,0,0,0,1.01884,2.45451.80336.80336,0,0,1-.12345.977l-.84023.84023a.91728.91728,0,0,0-.00032,1.29739l1.217,1.21705a.91737.91737,0,0,0,1.29738.00032l.8405-.84056a.80714.80714,0,0,1,.97707-.12339Z'/%3E%3Cpath class='cls-1' d='M13.71023,19.67633a5.9661,5.9661,0,1,1,5.9661-5.9661A5.97283,5.97283,0,0,1,13.71023,19.67633Zm0-10.32552a4.35943,4.35943,0,1,0,4.35943,4.35942,4.36433,4.36433,0,0,0-4.35943-4.35942Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"/>
						</Box>
					</Flex>

					<Flex layerStyle='inputLike'>
						<Box flex='1' pr='0.5rem'>
							<Box as='span' textStyle='uppercase' {...span}>Balance: 333.33 VADER</Box>
							<NumberInput {...flex} {...input}>
								<NumberInputField placeholder='0.0' {...field}/>
							</NumberInput>
						</Box>
						<Box
							as='button'
							display='inline-flex'
							minWidth='42px'
							onClick={() => {
								onOpen()
								setIsSelect(0)
							}}
						>
							<Image
								width='42px'
								mr='10px'
								src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 267.21641 267.21641'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:url(%23linear-gradient);%7D.cls-2%7Bfill:url(%23linear-gradient-2);%7D.cls-3%7Bfill:url(%23linear-gradient-3);%7D.cls-4%7Bfill:url(%23linear-gradient-4);%7D.cls-5%7Bfill:url(%23linear-gradient-5);%7D.cls-6%7Bfill:url(%23linear-gradient-6);%7D.cls-7%7Bfill:url(%23linear-gradient-7);%7D.cls-8%7Bfill:url(%23linear-gradient-8);%7D.cls-9%7Bfill:url(%23linear-gradient-9);%7D.cls-10%7Bfill:url(%23linear-gradient-10);%7D.cls-11%7Bfill:url(%23linear-gradient-11);%7D.cls-12%7Bfill:url(%23linear-gradient-12);%7D.cls-13%7Bfill:url(%23linear-gradient-13);%7D%3C/style%3E%3ClinearGradient id='linear-gradient' x1='231.32343' y1='42.48728' x2='35.89298' y2='224.72913' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffc8ff'/%3E%3Cstop offset='1' stop-color='%23ff9ddb'/%3E%3C/linearGradient%3E%3ClinearGradient id='linear-gradient-2' x1='138.68878' y1='62.15678' x2='138.68878' y2='173.20605' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.41899' stop-color='%2326a4fe'/%3E%3Cstop offset='1' stop-color='%2338e9fd'/%3E%3C/linearGradient%3E%3ClinearGradient id='linear-gradient-3' x1='128.52763' y1='173.20605' x2='128.52763' y2='62.15678' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.3' stop-color='%23ff9ddb'/%3E%3Cstop offset='1' stop-color='%23ffc8ff'/%3E%3C/linearGradient%3E%3ClinearGradient id='linear-gradient-4' x1='111.72537' y1='190.35778' x2='111.72537' y2='210.87759' xlink:href='%23linear-gradient-2'/%3E%3ClinearGradient id='linear-gradient-5' x1='95.06293' y1='190.35778' x2='95.06293' y2='210.87759' xlink:href='%23linear-gradient-2'/%3E%3ClinearGradient id='linear-gradient-6' x1='134.69533' y1='190.35778' x2='134.69533' y2='210.87759' xlink:href='%23linear-gradient-2'/%3E%3ClinearGradient id='linear-gradient-7' x1='156.10681' y1='190.35778' x2='156.10681' y2='210.87759' xlink:href='%23linear-gradient-2'/%3E%3ClinearGradient id='linear-gradient-8' x1='177.78989' y1='190.35778' x2='177.78989' y2='210.87759' xlink:href='%23linear-gradient-2'/%3E%3ClinearGradient id='linear-gradient-9' x1='109.84778' y1='210.87759' x2='109.84778' y2='190.35778' xlink:href='%23linear-gradient-3'/%3E%3ClinearGradient id='linear-gradient-10' x1='93.18534' y1='210.87759' x2='93.18534' y2='190.35778' xlink:href='%23linear-gradient-3'/%3E%3ClinearGradient id='linear-gradient-11' x1='132.81774' y1='210.87759' x2='132.81774' y2='190.35778' xlink:href='%23linear-gradient-3'/%3E%3ClinearGradient id='linear-gradient-12' x1='154.22922' y1='210.87759' x2='154.22922' y2='190.35778' xlink:href='%23linear-gradient-3'/%3E%3ClinearGradient id='linear-gradient-13' x1='175.9123' y1='210.87759' x2='175.9123' y2='190.35778' xlink:href='%23linear-gradient-3'/%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Ccircle class='cls-1' cx='133.6082' cy='133.6082' r='133.6082'/%3E%3Ccircle cx='133.6082' cy='133.6082' r='121.1146'/%3E%3Cpath class='cls-2' d='M102.51559,62.2612l-.05221-.10442H66.78587l.05221.10442L72.28843,73.267h35.4693Zm72.85449-.10442-32.91286,69.321-2.97286,6.25931H138.493L127.96986,115.6603l-5.24214-11.00608H87.85822l5.46372,11.00608,28.5322,57.54575h33.682L210.59169,62.15678ZM117.8638,94.47015l-5.25552-11.01881H77.34783l5.46436,11.01881Z'/%3E%3Cpath class='cls-3' d='M92.35444,62.2612l-.05222-.10442H56.62472l.05221.10442L62.12728,73.267h35.4693Zm72.85448-.10442-32.91285,69.321-2.97286,6.25931h-.99137L117.80871,115.6603l-5.24214-11.00608H77.69707l5.46372,11.00608,28.5322,57.54575h33.682L200.43053,62.15678ZM107.70264,94.47015l-5.25551-11.01881H67.18668L72.651,94.47015Z'/%3E%3Cpath class='cls-4' d='M112.10609,190.35778l-10.17317,20.51981h4.93238l1.88427-4.04084h8.29611v4.04084h4.47214V190.35778Zm4.93959,12.00683h-6.20944l3.51315-7.5371h2.69629Z'/%3E%3Cpath class='cls-5' d='M88.3788,190.37707l-.00964-.01929H81.77663l.00964.01929,1.00713,2.03366h6.554Zm13.46214-.01929L95.75927,203.167l-.54933,1.1566h-.18319l-1.94447-4.07937-.96865-2.03372H85.6704L86.68,200.24422l5.27221,10.63337H98.176l10.17322-20.51981Zm-10.62608,5.9709-.97111-2.03607H83.72828l1.00971,2.03607Z'/%3E%3Cpath class='cls-6' d='M142.025,192.77187q2.09249,2.414,2.09266,7.84572,0,5.46087-2.08221,7.86021-2.082,2.4-6.33063,2.39979H125.273V190.35778h10.43181Q139.93241,190.35778,142.025,192.77187Zm-11.9568,2.61524v10.46114h4.54307a3.97154,3.97154,0,0,0,3.18622-1.23583,8.04289,8.04289,0,0,0,0-7.98947,3.9727,3.9727,0,0,0-3.18622-1.23584Z'/%3E%3Cpolygon class='cls-7' points='152.668 198.203 163.647 198.203 163.647 202.543 152.668 202.543 152.668 206.164 164.341 206.164 164.341 210.878 147.873 210.878 147.873 190.358 164.11 190.358 164.11 195.042 152.668 195.042 152.668 198.203'/%3E%3Cpath class='cls-8' d='M187.31737,210.87759h-5.57354l-2.8813-6.58128h-5.80494v6.58128H168.2624V190.35778h12.78741q3.11233,0,4.5009,1.66691a7.83056,7.83056,0,0,1,1.388,5.08672,7.50311,7.50311,0,0,1-.84124,3.95174,4.367,4.367,0,0,1-2.3976,1.85375v.22975Zm-6.08878-11.75437a2.52313,2.52313,0,0,0,.41017-1.58073,2.45962,2.45962,0,0,0-.41017-1.56625,1.62784,1.62784,0,0,0-1.33558-.50295h-6.83542v4.16718H179.893A1.60347,1.60347,0,0,0,181.22859,199.12322Z'/%3E%3Cpath class='cls-9' d='M110.2285,190.35778l-10.17317,20.51981h4.93238l1.88427-4.04084h8.29611v4.04084h4.47214V190.35778Zm4.93959,12.00683h-6.20943l3.51314-7.5371h2.69629Z'/%3E%3Cpath class='cls-10' d='M86.50122,190.37707l-.00965-.01929H79.899l.00965.01929,1.00712,2.03366h6.55405Zm13.46213-.01929L93.88168,203.167l-.54933,1.1566h-.18319l-1.94447-4.07937L90.236,198.2105H83.79281l1.00959,2.03372,5.27222,10.63337h6.2238l10.17322-20.51981Zm-10.62607,5.9709-.97112-2.03607H81.85069l1.00971,2.03607Z'/%3E%3Cpath class='cls-11' d='M140.1474,192.77187q2.09249,2.414,2.09267,7.84572,0,5.46087-2.08222,7.86021-2.082,2.4-6.33063,2.39979H123.39541V190.35778h10.43181Q138.05482,190.35778,140.1474,192.77187Zm-11.9568,2.61524v10.46114h4.54307a3.97154,3.97154,0,0,0,3.18622-1.23583,8.04289,8.04289,0,0,0,0-7.98947,3.9727,3.9727,0,0,0-3.18622-1.23584Z'/%3E%3Cpolygon class='cls-12' points='150.79 198.203 161.769 198.203 161.769 202.543 150.79 202.543 150.79 206.164 162.463 206.164 162.463 210.878 145.995 210.878 145.995 190.358 162.232 190.358 162.232 195.042 150.79 195.042 150.79 198.203'/%3E%3Cpath class='cls-13' d='M185.43978,210.87759h-5.57354l-2.8813-6.58128H171.18v6.58128h-4.79518V190.35778h12.78741q3.11232,0,4.50089,1.66691a7.83056,7.83056,0,0,1,1.388,5.08672,7.50311,7.50311,0,0,1-.84124,3.95174,4.367,4.367,0,0,1-2.3976,1.85375v.22975ZM179.351,199.12322a2.52313,2.52313,0,0,0,.41017-1.58073,2.45962,2.45962,0,0,0-.41017-1.56625,1.62784,1.62784,0,0,0-1.33558-.50295H171.18v4.16718h6.83542A1.60347,1.60347,0,0,0,179.351,199.12322Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
							/>
							<Box as='span' fontWeight='bold' alignSelf='center' mr='5px'>VADER</Box>
							<TriangleDownIcon alignSelf='center'/>
						</Box>
					</Flex>

					<Box
						as='button'
						m='1rem auto'
						width='22px'
					>
						<Image m='0' height='22px' src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22.51799 24.3561'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fff;%7D%3C/style%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpath class='cls-1' d='M9.35617,19.94679a.76142.76142,0,0,0,0-1.076l-.98424-.98424a.76142.76142,0,0,0-1.076,0l-.98423.98424V5.3279A2.28581,2.28581,0,0,1,8.595,3.04451,1.1432,1.1432,0,0,0,9.73673,1.90282V1.14169A1.1432,1.1432,0,0,0,8.595,0a5.33375,5.33375,0,0,0-5.3279,5.3279V18.87075l-.98423-.98424a.76143.76143,0,0,0-1.07605,0l-.98423.98424a.76142.76142,0,0,0,0,1.076l4.29752,4.298a.38129.38129,0,0,0,.5385,0Z'/%3E%3Cpath class='cls-1' d='M13.16181,4.40931a.76143.76143,0,0,0,0,1.07605l.98423.98423a.76.76,0,0,0,1.07605,0l.98423-.98423V19.0282a2.2858,2.2858,0,0,1-2.28338,2.28339,1.14321,1.14321,0,0,0-1.1417,1.14169v.76113a1.14321,1.14321,0,0,0,1.1417,1.14169,5.33374,5.33374,0,0,0,5.32789-5.3279V5.48536l.98424.98423a.76.76,0,0,0,1.076,0l.98424-.98423a.7614.7614,0,0,0,0-1.07605L17.99783.11132a.38127.38127,0,0,0-.5385,0Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"/>
					</Box>

					<Flex layerStyle='inputLike'>
						<Box flex='1' pr='0.5rem'>
							<Box as='span' textStyle='uppercase' {...span}>Balance: 333.33 VADER</Box>
							<NumberInput {...flex} {...input}>
								<NumberInputField placeholder='0.0' {...field}/>
							</NumberInput>
						</Box>
						<Box
							as='button'
							display='inline-flex'
							minWidth='42px'
							onClick={() => {
								onOpen()
								setIsSelect(1)
							}}
						>
							<Image
								width='42px'
								mr='10px'
								src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 267.21641 267.21641'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:url(%23linear-gradient);%7D.cls-2%7Bfill:url(%23linear-gradient-2);%7D.cls-3%7Bfill:url(%23linear-gradient-3);%7D.cls-4%7Bfill:url(%23linear-gradient-4);%7D.cls-5%7Bfill:url(%23linear-gradient-5);%7D.cls-6%7Bfill:url(%23linear-gradient-6);%7D.cls-7%7Bfill:url(%23linear-gradient-7);%7D.cls-8%7Bfill:url(%23linear-gradient-8);%7D.cls-9%7Bfill:url(%23linear-gradient-9);%7D.cls-10%7Bfill:url(%23linear-gradient-10);%7D.cls-11%7Bfill:url(%23linear-gradient-11);%7D.cls-12%7Bfill:url(%23linear-gradient-12);%7D.cls-13%7Bfill:url(%23linear-gradient-13);%7D%3C/style%3E%3ClinearGradient id='linear-gradient' x1='231.32343' y1='42.48728' x2='35.89298' y2='224.72913' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffc8ff'/%3E%3Cstop offset='1' stop-color='%23ff9ddb'/%3E%3C/linearGradient%3E%3ClinearGradient id='linear-gradient-2' x1='138.68878' y1='62.15678' x2='138.68878' y2='173.20605' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.41899' stop-color='%2326a4fe'/%3E%3Cstop offset='1' stop-color='%2338e9fd'/%3E%3C/linearGradient%3E%3ClinearGradient id='linear-gradient-3' x1='128.52763' y1='173.20605' x2='128.52763' y2='62.15678' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.3' stop-color='%23ff9ddb'/%3E%3Cstop offset='1' stop-color='%23ffc8ff'/%3E%3C/linearGradient%3E%3ClinearGradient id='linear-gradient-4' x1='111.72537' y1='190.35778' x2='111.72537' y2='210.87759' xlink:href='%23linear-gradient-2'/%3E%3ClinearGradient id='linear-gradient-5' x1='95.06293' y1='190.35778' x2='95.06293' y2='210.87759' xlink:href='%23linear-gradient-2'/%3E%3ClinearGradient id='linear-gradient-6' x1='134.69533' y1='190.35778' x2='134.69533' y2='210.87759' xlink:href='%23linear-gradient-2'/%3E%3ClinearGradient id='linear-gradient-7' x1='156.10681' y1='190.35778' x2='156.10681' y2='210.87759' xlink:href='%23linear-gradient-2'/%3E%3ClinearGradient id='linear-gradient-8' x1='177.78989' y1='190.35778' x2='177.78989' y2='210.87759' xlink:href='%23linear-gradient-2'/%3E%3ClinearGradient id='linear-gradient-9' x1='109.84778' y1='210.87759' x2='109.84778' y2='190.35778' xlink:href='%23linear-gradient-3'/%3E%3ClinearGradient id='linear-gradient-10' x1='93.18534' y1='210.87759' x2='93.18534' y2='190.35778' xlink:href='%23linear-gradient-3'/%3E%3ClinearGradient id='linear-gradient-11' x1='132.81774' y1='210.87759' x2='132.81774' y2='190.35778' xlink:href='%23linear-gradient-3'/%3E%3ClinearGradient id='linear-gradient-12' x1='154.22922' y1='210.87759' x2='154.22922' y2='190.35778' xlink:href='%23linear-gradient-3'/%3E%3ClinearGradient id='linear-gradient-13' x1='175.9123' y1='210.87759' x2='175.9123' y2='190.35778' xlink:href='%23linear-gradient-3'/%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Ccircle class='cls-1' cx='133.6082' cy='133.6082' r='133.6082'/%3E%3Ccircle cx='133.6082' cy='133.6082' r='121.1146'/%3E%3Cpath class='cls-2' d='M102.51559,62.2612l-.05221-.10442H66.78587l.05221.10442L72.28843,73.267h35.4693Zm72.85449-.10442-32.91286,69.321-2.97286,6.25931H138.493L127.96986,115.6603l-5.24214-11.00608H87.85822l5.46372,11.00608,28.5322,57.54575h33.682L210.59169,62.15678ZM117.8638,94.47015l-5.25552-11.01881H77.34783l5.46436,11.01881Z'/%3E%3Cpath class='cls-3' d='M92.35444,62.2612l-.05222-.10442H56.62472l.05221.10442L62.12728,73.267h35.4693Zm72.85448-.10442-32.91285,69.321-2.97286,6.25931h-.99137L117.80871,115.6603l-5.24214-11.00608H77.69707l5.46372,11.00608,28.5322,57.54575h33.682L200.43053,62.15678ZM107.70264,94.47015l-5.25551-11.01881H67.18668L72.651,94.47015Z'/%3E%3Cpath class='cls-4' d='M112.10609,190.35778l-10.17317,20.51981h4.93238l1.88427-4.04084h8.29611v4.04084h4.47214V190.35778Zm4.93959,12.00683h-6.20944l3.51315-7.5371h2.69629Z'/%3E%3Cpath class='cls-5' d='M88.3788,190.37707l-.00964-.01929H81.77663l.00964.01929,1.00713,2.03366h6.554Zm13.46214-.01929L95.75927,203.167l-.54933,1.1566h-.18319l-1.94447-4.07937-.96865-2.03372H85.6704L86.68,200.24422l5.27221,10.63337H98.176l10.17322-20.51981Zm-10.62608,5.9709-.97111-2.03607H83.72828l1.00971,2.03607Z'/%3E%3Cpath class='cls-6' d='M142.025,192.77187q2.09249,2.414,2.09266,7.84572,0,5.46087-2.08221,7.86021-2.082,2.4-6.33063,2.39979H125.273V190.35778h10.43181Q139.93241,190.35778,142.025,192.77187Zm-11.9568,2.61524v10.46114h4.54307a3.97154,3.97154,0,0,0,3.18622-1.23583,8.04289,8.04289,0,0,0,0-7.98947,3.9727,3.9727,0,0,0-3.18622-1.23584Z'/%3E%3Cpolygon class='cls-7' points='152.668 198.203 163.647 198.203 163.647 202.543 152.668 202.543 152.668 206.164 164.341 206.164 164.341 210.878 147.873 210.878 147.873 190.358 164.11 190.358 164.11 195.042 152.668 195.042 152.668 198.203'/%3E%3Cpath class='cls-8' d='M187.31737,210.87759h-5.57354l-2.8813-6.58128h-5.80494v6.58128H168.2624V190.35778h12.78741q3.11233,0,4.5009,1.66691a7.83056,7.83056,0,0,1,1.388,5.08672,7.50311,7.50311,0,0,1-.84124,3.95174,4.367,4.367,0,0,1-2.3976,1.85375v.22975Zm-6.08878-11.75437a2.52313,2.52313,0,0,0,.41017-1.58073,2.45962,2.45962,0,0,0-.41017-1.56625,1.62784,1.62784,0,0,0-1.33558-.50295h-6.83542v4.16718H179.893A1.60347,1.60347,0,0,0,181.22859,199.12322Z'/%3E%3Cpath class='cls-9' d='M110.2285,190.35778l-10.17317,20.51981h4.93238l1.88427-4.04084h8.29611v4.04084h4.47214V190.35778Zm4.93959,12.00683h-6.20943l3.51314-7.5371h2.69629Z'/%3E%3Cpath class='cls-10' d='M86.50122,190.37707l-.00965-.01929H79.899l.00965.01929,1.00712,2.03366h6.55405Zm13.46213-.01929L93.88168,203.167l-.54933,1.1566h-.18319l-1.94447-4.07937L90.236,198.2105H83.79281l1.00959,2.03372,5.27222,10.63337h6.2238l10.17322-20.51981Zm-10.62607,5.9709-.97112-2.03607H81.85069l1.00971,2.03607Z'/%3E%3Cpath class='cls-11' d='M140.1474,192.77187q2.09249,2.414,2.09267,7.84572,0,5.46087-2.08222,7.86021-2.082,2.4-6.33063,2.39979H123.39541V190.35778h10.43181Q138.05482,190.35778,140.1474,192.77187Zm-11.9568,2.61524v10.46114h4.54307a3.97154,3.97154,0,0,0,3.18622-1.23583,8.04289,8.04289,0,0,0,0-7.98947,3.9727,3.9727,0,0,0-3.18622-1.23584Z'/%3E%3Cpolygon class='cls-12' points='150.79 198.203 161.769 198.203 161.769 202.543 150.79 202.543 150.79 206.164 162.463 206.164 162.463 210.878 145.995 210.878 145.995 190.358 162.232 190.358 162.232 195.042 150.79 195.042 150.79 198.203'/%3E%3Cpath class='cls-13' d='M185.43978,210.87759h-5.57354l-2.8813-6.58128H171.18v6.58128h-4.79518V190.35778h12.78741q3.11232,0,4.50089,1.66691a7.83056,7.83056,0,0,1,1.388,5.08672,7.50311,7.50311,0,0,1-.84124,3.95174,4.367,4.367,0,0,1-2.3976,1.85375v.22975ZM179.351,199.12322a2.52313,2.52313,0,0,0,.41017-1.58073,2.45962,2.45962,0,0,0-.41017-1.56625,1.62784,1.62784,0,0,0-1.33558-.50295H171.18v4.16718h6.83542A1.60347,1.60347,0,0,0,179.351,199.12322Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
							/>
							<Box as='span' fontWeight='bold' alignSelf='center' mr='5px'>VADER</Box>
							<TriangleDownIcon alignSelf='center'/>
						</Box>
					</Flex>
					<Flex {...flex}></Flex>
					<Button
						minWidth='230px'
						m='2rem auto 1.7rem'
						size='lg'
						variant='solidRadial'
					>
						<Box>SWAP</Box>
					</Button>
				</Flex>
			</Box>

			<Modal
				onClose={onClose}
				isOpen={isOpen}
				scrollBehavior='inside'
				isCentered
				initialFocusRef={initialRef}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Select a token</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display='flex'
						flexDir='column'
						p='0'>
						<Box
							p='0 1.5rem 1rem'>
							<Input
								size='lg'
								placeholder='Search name or paste address'
								onChange={e => searchFor(tokenList, e.target.value, setTokenListModified)}
							/>
						</Box>
						{tokenListModified &&
							<>
								{console.log('is here')}
								{console.log(tokenListModified)}
								<List
									width={448}
									height={600}
									itemCount={tokenListModified.length}
									itemSize={64}
									itemData={tokenListModified}>
									{TokenSelectButton}
								</List>
							</>
						}
					</ModalBody>
					<ModalFooter/>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Swap