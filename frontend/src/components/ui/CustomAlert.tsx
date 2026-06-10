import Alert from '@mui/material/Alert';
type AlertProps = {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
};
export default function CustomAlert({ severity, message }: AlertProps) {
  return <Alert severity={severity}>{message}</Alert>;
}