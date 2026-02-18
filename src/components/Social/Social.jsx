import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Social = () => {

    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

        const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    };  
    return (
        <div className="flex justify-center gap-4 mt-4 text-2xl">
            {/* You can replace these with React Icons like FaGoogle, FaFacebook */}
            <button className="btn btn-circle btn-outline btn-sm">f</button>
            <button className="btn btn-circle btn-outline btn-sm" onClick={handleGoogleSignIn}>G</button>
            <button className="btn btn-circle btn-outline btn-sm">in</button>
        </div>
    );
};

export default Social;