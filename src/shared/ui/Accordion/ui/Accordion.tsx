import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  AccordionDetails,
  AccordionProps as AccordionPropsMui,
  AccordionSummary,
  Accordion as MuiAccordion,
  Typography,
} from '@mui/material'

import { ReactNode } from 'react'

type AccordionProps = AccordionPropsMui & {
  summary: string
  children: ReactNode
}

export const Accordion = ({ summary, children, ...rest }: AccordionProps) => {
  return (
    <MuiAccordion {...rest}>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography component="span" fontWeight="bold">
          {summary}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  )
}
