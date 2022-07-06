import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from '@mui/material';
import { apyCalculator } from 'src/utils/calculator';

export const BasicTable = ({ data }: { data: object[] }) => {

  const calculator = (asset: any) => {
    const {
      liquidityRate,
      variableBorrowRate,
      aToken,
      vToken,
      totalATokenSupply,
      totalCurrentVariableDebt,
      price
    } = asset
    const {
      emissionsPerSecond,
      rewardTokenDecimals
    } = aToken.rewards[0]
    const { underlyingAssetDecimals } = aToken
    const vEmissionPerSecond = vToken.rewards[0]?.emissionsPerSecond

    const value: {
      incentiveDepositAPRPercent: number,
      incentiveBorrowAPRPercent: number,
      depositAPY: number,
      variableBorrowAPY: number,
      stableBorrowAPY: number
    } = apyCalculator({
      liquidityRate: +liquidityRate,
      totalATokenSupply: +totalATokenSupply,
      variableBorrowRate: +variableBorrowRate,
      vEmissionPerSecond: +vEmissionPerSecond,
      rewardTokenDecimals: +rewardTokenDecimals,
      totalCurrentVariableDebt: +totalCurrentVariableDebt,
      priceInEth: +price.priceInEth,
      aEmissionPerSecond: +emissionsPerSecond,
      underlyingTokenDecimal: +underlyingAssetDecimals,
    })

    console.log(asset.name, value)
    return value
  }

  return (
    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Asset</TableCell>
            <TableCell align="center">APY, Borrow</TableCell>
            <TableCell align="center">APY, Deposit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: any) => (
            <TableRow
              key={item.symbol}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {item.symbol}
              </TableCell>
              <TableCell align="center">{calculator(item).incentiveBorrowAPRPercent / 1e8}</TableCell>
              <TableCell align="center">{calculator(item).incentiveDepositAPRPercent / 1e8}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
