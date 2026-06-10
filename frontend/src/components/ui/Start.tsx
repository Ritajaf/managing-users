import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
export default function Start(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome</h1>
            <div className="flex gap-6">
                <Button variant="contained" color="primary" component={Link} href="/start/Login" >
                    Login  
                </Button>
            
                <Button variant="contained" color="primary" component={Link} href="/start/Register">
                    Register
                </Button>
            </div>
        </div>
    )
}