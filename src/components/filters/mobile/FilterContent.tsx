import React from 'react'
import { BoxWrapperColumn, BoxWrapperRow, CustomTypography } from 'src/components'
import { styled } from '@mui/material/styles'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  height: '42px',
  fontSize: '14px',
  fontWeight: 600,
  color: theme.palette.primary.main,
  backgroundColor: '#DEDEDE',
  ':hover': {
    backgroundColor: 'white'
  }
}))

const CustomTypo = styled(CustomTypography)(() => ({
  fontSize: 18,
  fontWeight: 600
}))

interface FilterContentProps {
  enableBlockchain?: boolean
  enableProtocol?: boolean
  enableDeFiType?: boolean
  enableToken?: boolean
  blockchainOptions?: any[]
  protocolOptions?: any[]
  deFiTypeOptions?: any[]
  tokenOptions?: any[]
  handleClear: () => void
  handleClick: (params: any) => void
  defaultBlockchainValue?: Maybe<string>
  defaultProtocolValue?: Maybe<string>
  defaultDeFiTypeValue?: Maybe<string>
  defaultTokenValue?: Maybe<string>
}

export const FilterContent = ({
  enableBlockchain = false,
  enableProtocol = false,
  enableDeFiType = false,
  enableToken = false,
  protocolOptions = [],
  blockchainOptions = [],
  deFiTypeOptions = [],
  tokenOptions = [],
  handleClear,
  handleClick,
  defaultBlockchainValue = null,
  defaultProtocolValue = null,
  defaultDeFiTypeValue = null,
  defaultTokenValue = null
}: FilterContentProps) => {
  const [openModal, setOpenModal] = React.useState(false)

  const handleClickOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedBlockchain(null)
    setSelectedProtocol(null)
    setSelectedDeFiType(null)
    setSelectedToken(null)
    setIsMenuBeenDisplayed(true)
    setIsBlockchainSelectionBeenDisplayed(false)
    setIsProtocolSelectionBeenDisplayed(false)
    setIsDeFiTypeSelectionBeenDisplayed(false)
    setIsTokenSelectionBeenDisplayed(false)
  }

  const [selectedBlockchain, setSelectedBlockchain] = React.useState<Maybe<string>>(
    defaultBlockchainValue ? defaultBlockchainValue : null
  )
  const [selectedProtocol, setSelectedProtocol] = React.useState<Maybe<string>>(
    defaultProtocolValue ? defaultProtocolValue : null
  )
  const [selectedDeFiType, setSelectedDeFiType] = React.useState<Maybe<string>>(
    defaultDeFiTypeValue ? defaultDeFiTypeValue : null
  )
  const [selectedToken, setSelectedToken] = React.useState<Maybe<string>>(
    defaultTokenValue ? defaultTokenValue : null
  )

  React.useEffect(() => {
    if (defaultBlockchainValue) setSelectedBlockchain(defaultBlockchainValue)
    if (defaultProtocolValue) setSelectedProtocol(defaultProtocolValue)
    if (defaultDeFiTypeValue) setSelectedDeFiType(defaultDeFiTypeValue)
    if (defaultTokenValue) setSelectedToken(defaultTokenValue)
  }, [defaultBlockchainValue, defaultProtocolValue, defaultDeFiTypeValue, defaultTokenValue])

  const [isMenuBeenDisplayed, setIsMenuBeenDisplayed] = React.useState(true)
  const [isBlockchainSelectionBeenDisplayed, setIsBlockchainSelectionBeenDisplayed] =
    React.useState(false)
  const [isProtocolSelectionBeenDisplayed, setIsProtocolSelectionBeenDisplayed] =
    React.useState(false)
  const [isDeFiTypeSelectionBeenDisplayed, setIsDeFiTypeSelectionBeenDisplayed] =
    React.useState(false)
  const [isTokenSelectionBeenDisplayed, setIsTokenSelectionBeenDisplayed] = React.useState(false)

  const isDisabled = !selectedBlockchain && !selectedProtocol && !selectedDeFiType && !selectedToken

  const amountOfSelectedFilters = React.useMemo(() => {
    // return the amount of selected filters
    return [selectedBlockchain, selectedProtocol, selectedDeFiType, selectedToken].filter(
      (filter) => filter !== null
    ).length
  }, [selectedBlockchain, selectedProtocol, selectedDeFiType, selectedToken])

  return (
    <>
      <BoxWrapperRow sx={{ width: '100%', justifyContent: 'flex-end' }}>
        <CustomButton
          sx={{
            minWidth: amountOfSelectedFilters ? '120px' : '100px'
          }}
          onClick={() => {
            handleClickOpenModal()
          }}
        >
          Filters {amountOfSelectedFilters > 0 ? `(${amountOfSelectedFilters})` : ''}
        </CustomButton>
      </BoxWrapperRow>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            maxWidth: 'none',
            width: '100%',
            margin: 0,
            height: '80%',
            alignItems: 'flex-end',
            position: 'absolute',
            left: 0,
            bottom: 0,
            borderRadius: '46px 46px 0 0',
            backgroundColor: 'background.default'
          }
        }}
      >
        <BoxWrapperColumn
          sx={{
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: isMenuBeenDisplayed ? 'flex' : 'none'
          }}
        >
          <BoxWrapperColumn gap={2} sx={{ alignItems: 'center', marginTop: '20px' }}>
            {enableBlockchain && (
              <BoxWrapperColumn sx={{ alignItems: 'center' }}>
                <CustomTypo sx={{ color: 'primary.main', marginTop: '20px', marginBottom: '10px' }}>
                  Blockchain
                </CustomTypo>
                <CustomButton
                  sx={{ width: '314px' }}
                  onClick={() => {
                    setIsMenuBeenDisplayed(false)
                    setIsBlockchainSelectionBeenDisplayed(true)
                  }}
                >
                  <CustomTypo sx={{ color: 'custom.grey.ternary' }}>
                    {selectedBlockchain || 'Select blockchain'}
                  </CustomTypo>
                </CustomButton>
              </BoxWrapperColumn>
            )}

            {enableProtocol && (
              <BoxWrapperColumn sx={{ alignItems: 'center' }}>
                <CustomTypo sx={{ color: 'primary.main', marginTop: '20px', marginBottom: '10px' }}>
                  Protocol
                </CustomTypo>
                <CustomButton
                  sx={{ width: '314px' }}
                  onClick={() => {
                    setIsMenuBeenDisplayed(false)
                    setIsProtocolSelectionBeenDisplayed(true)
                  }}
                >
                  <CustomTypo sx={{ color: 'custom.grey.ternary' }}>
                    {selectedProtocol || 'Select protocol'}
                  </CustomTypo>
                </CustomButton>
              </BoxWrapperColumn>
            )}

            {enableDeFiType && (
              <BoxWrapperColumn sx={{ alignItems: 'center' }}>
                <CustomTypo sx={{ color: 'primary.main', marginTop: '20px', marginBottom: '10px' }}>
                  DeFi type
                </CustomTypo>
                <CustomButton
                  sx={{ width: '314px' }}
                  onClick={() => {
                    setIsMenuBeenDisplayed(false)
                    setIsDeFiTypeSelectionBeenDisplayed(true)
                  }}
                >
                  <CustomTypo sx={{ color: 'custom.grey.ternary' }}>
                    {selectedDeFiType || 'Select type'}
                  </CustomTypo>
                </CustomButton>
              </BoxWrapperColumn>
            )}

            {enableToken && (
              <BoxWrapperColumn sx={{ alignItems: 'center' }}>
                <CustomTypo sx={{ color: 'primary.main', marginTop: '20px', marginBottom: '10px' }}>
                  Token
                </CustomTypo>
                <CustomButton
                  sx={{ width: '314px' }}
                  onClick={() => {
                    setIsMenuBeenDisplayed(false)
                    setIsTokenSelectionBeenDisplayed(true)
                  }}
                >
                  <CustomTypo sx={{ color: 'custom.grey.ternary' }}>
                    {selectedToken || 'Select token'}
                  </CustomTypo>
                </CustomButton>
              </BoxWrapperColumn>
            )}
          </BoxWrapperColumn>

          <BoxWrapperColumn
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Button
              disabled={isDisabled}
              sx={{
                borderRadius: '50px',
                width: '314px',
                height: '48px',
                marginBottom: '10px',
                fontSize: '18px',
                ':disabled': {
                  backgroundColor: 'custom.grey.ternary',
                  color: 'custom.grey.quaternary'
                }
              }}
              onClick={() => {
                if (
                  !selectedBlockchain &&
                  !selectedProtocol &&
                  !selectedDeFiType &&
                  !selectedToken
                ) {
                  return
                }

                // close modal
                handleCloseModal()
                const params = {
                  blockchain: selectedBlockchain,
                  protocol: selectedProtocol,
                  deFiType: selectedDeFiType,
                  token: selectedToken
                }
                handleClick(params)
              }}
            >
              Apply filters
            </Button>
            <Button
              sx={{
                borderRadius: '50px',
                width: '314px',
                height: '48px',
                marginBottom: '10px',
                fontSize: '18px'
              }}
              onClick={() => {
                // clear filters
                setSelectedBlockchain(null)
                setSelectedProtocol(null)
                setSelectedDeFiType(null)
                setSelectedToken(null)
                handleClear()
                handleCloseModal()
              }}
            >
              Clear filters
            </Button>
          </BoxWrapperColumn>
        </BoxWrapperColumn>

        {enableBlockchain && blockchainOptions && blockchainOptions.length > 0 && (
          <BoxWrapperColumn
            sx={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              display: isBlockchainSelectionBeenDisplayed ? 'flex' : 'none'
            }}
          >
            <BoxWrapperColumn gap={2} sx={{ alignItems: 'center', marginTop: '20px' }}>
              <CustomTypo sx={{ color: 'primary.main', marginY: '20px' }}>
                Select Blockchain
              </CustomTypo>
              {blockchainOptions?.map((option) => (
                <CustomButton
                  key={option.id}
                  onClick={() => {
                    setIsMenuBeenDisplayed(true)
                    setIsBlockchainSelectionBeenDisplayed(false)
                    setSelectedBlockchain(option.id)
                  }}
                  sx={{ justifyContent: 'flex-start', width: '200px' }}
                >
                  <CustomTypo gap={2} sx={{ paddingLeft: '60px' }}>
                    {option.label}
                  </CustomTypo>
                </CustomButton>
              ))}
            </BoxWrapperColumn>
          </BoxWrapperColumn>
        )}

        {enableProtocol && protocolOptions && protocolOptions.length > 0 && (
          <BoxWrapperColumn
            sx={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              display: isProtocolSelectionBeenDisplayed ? 'flex' : 'none'
            }}
          >
            <BoxWrapperColumn gap={2} sx={{ alignItems: 'center', marginTop: '20px' }}>
              <CustomTypo sx={{ color: 'primary.main', marginY: '20px' }}>
                Select Protocol
              </CustomTypo>
              {protocolOptions?.map((option) => (
                <CustomButton
                  key={option.id}
                  onClick={() => {
                    setIsMenuBeenDisplayed(true)
                    setIsProtocolSelectionBeenDisplayed(false)
                    setSelectedProtocol(option.id)
                  }}
                  sx={{ justifyContent: 'flex-start', width: '200px' }}
                >
                  <CustomTypo gap={2} sx={{ paddingLeft: '60px' }}>
                    {option.label}
                  </CustomTypo>
                </CustomButton>
              ))}
            </BoxWrapperColumn>
          </BoxWrapperColumn>
        )}

        {enableToken && tokenOptions && tokenOptions.length > 0 && (
          <BoxWrapperColumn
            sx={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              display: isTokenSelectionBeenDisplayed ? 'flex' : 'none'
            }}
          >
            <BoxWrapperColumn gap={2} sx={{ alignItems: 'center', marginTop: '20px' }}>
              <CustomTypo sx={{ color: 'primary.main', marginY: '20px' }}>Select Token</CustomTypo>
              {tokenOptions?.map((option) => (
                <CustomButton
                  key={option.id}
                  onClick={() => {
                    setIsMenuBeenDisplayed(true)
                    setIsTokenSelectionBeenDisplayed(false)
                    setSelectedToken(option.id)
                  }}
                  sx={{ justifyContent: 'flex-start', width: '200px' }}
                >
                  <CustomTypo gap={2} sx={{ paddingLeft: '60px' }}>
                    {option.label}
                  </CustomTypo>
                </CustomButton>
              ))}
            </BoxWrapperColumn>
          </BoxWrapperColumn>
        )}

        {enableDeFiType && deFiTypeOptions && deFiTypeOptions.length > 0 && (
          <BoxWrapperColumn
            sx={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              display: isDeFiTypeSelectionBeenDisplayed ? 'flex' : 'none'
            }}
          >
            <BoxWrapperColumn gap={2} sx={{ alignItems: 'center', marginTop: '20px' }}>
              <CustomTypo sx={{ color: 'primary.main', marginY: '20px' }}>Select type</CustomTypo>
              {deFiTypeOptions?.map((option) => (
                <CustomButton
                  key={option.id}
                  onClick={() => {
                    setIsMenuBeenDisplayed(true)
                    setIsDeFiTypeSelectionBeenDisplayed(false)
                    setSelectedDeFiType(option.id)
                  }}
                  sx={{ justifyContent: 'flex-start', width: '200px' }}
                >
                  <CustomTypo gap={2} sx={{ paddingLeft: '60px' }}>
                    {option.label}
                  </CustomTypo>
                </CustomButton>
              ))}
            </BoxWrapperColumn>
          </BoxWrapperColumn>
        )}
      </Dialog>
    </>
  )
}
