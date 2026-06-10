import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';

type Field = {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type BasePageProps = {
  title: string;
  buttonText: string;
  fields: Field[];
  showRememberMe?: boolean;
  onSubmit?: () => void;
};

export default function BasePage({
  title,
  buttonText,
  fields,
  showRememberMe = false,
  onSubmit,
}: BasePageProps) {
  return (
    <Card className="w-full">
      <CardContent>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>

        {fields.map((field) => (
          <Input
            key={field.placeholder}
            placeholder={field.placeholder}
            type={field.type || 'text'}
            fullWidth
            className="mb-4"
            value={field.value}
            onChange={field.onChange}
          />
        ))}

        {showRememberMe && (
          <div className="flex items-center mb-4">
            <Checkbox />
            <span className="ml-2">Remember me</span>
          </div>
        )}

        <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={onSubmit}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}