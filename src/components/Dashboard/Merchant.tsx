import { Box, Card, Link, Typography } from "@mui/material"
import React from "react"

interface Props {
  children?: React.ReactNode
  title: string
  description: string
  link: string
}

const Merchant = (props: Props) => {
  return (
    <React.Fragment>
      <Card sx={{ display: "flex", marginBottom: 1 }} variant="outlined">
        <Box display="flex" flexDirection="column" padding={1}>
          <Typography component="span" variant="body1">
            <Link href={props.link} target="_blank">
              {props.title}
            </Link>
          </Typography>
        </Box>
      </Card>
    </React.Fragment>
  )
}

export default Merchant
