import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material"
import React from "react"

import {
  AvalancheLogo,
  EthereumLogo,
  PolygonLogo
} from "~components/CryptoLogo"

import AccountBalanceValueUSDC from "./AccountBalanceValueUSDC"

interface Props {
  children?: React.ReactNode
}

const AccountNetworkBalanceItemUSDC = (props: Props) => {
  return (
    <Grid container item xs={12} sx={{ overflow: "hidden" }}>
      <TableContainer
        sx={{
          maxHeight: 260,
          overflowX: "hidden",
          "&::-webkit-scrollbar": { width: 2 },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "lightgray"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: 0
          }
        }}>
        <Table sx={{ minWidth: 343 }}>
          <TableBody>
            <TableRow hover sx={{ height: 64 }}>
              <TableCell width={"20%"} sx={{ textAlign: "left" }}>
                <AvalancheLogo />
              </TableCell>
              <TableCell width={"50%"} sx={{ textAlign: "left" }}>
                Avalanche
              </TableCell>
              <TableCell width={"30%"} sx={{ textAlign: "right" }}>
                <Typography fontSize={14}>
                  <AccountBalanceValueUSDC network="avalanche" />
                </Typography>
                <Typography fontSize={12}>USDC</Typography>
              </TableCell>
            </TableRow>

            <TableRow hover sx={{ height: 64 }}>
              <TableCell width={"20%"} sx={{ textAlign: "left" }}>
                <EthereumLogo />
              </TableCell>
              <TableCell width={"50%"} sx={{ textAlign: "left" }}>
                Ethereum
              </TableCell>
              <TableCell width={"30%"} sx={{ textAlign: "right" }}>
                <Typography fontSize={14}>
                  <AccountBalanceValueUSDC network="ethereum" />
                </Typography>
                <Typography fontSize={12}>USDC</Typography>
              </TableCell>
            </TableRow>

            <TableRow hover sx={{ height: 64 }}>
              <TableCell
                width={"20%"}
                sx={{ borderBottom: "none", textAlign: "left" }}>
                <PolygonLogo />
              </TableCell>
              <TableCell
                width={"50%"}
                sx={{ borderBottom: "none", textAlign: "left" }}>
                Polygon
              </TableCell>
              <TableCell
                width={"30%"}
                sx={{ borderBottom: "none", textAlign: "right" }}>
                <Typography fontSize={14}>
                  <AccountBalanceValueUSDC network="polygon" />
                </Typography>
                <Typography fontSize={12}>USDC</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default AccountNetworkBalanceItemUSDC
