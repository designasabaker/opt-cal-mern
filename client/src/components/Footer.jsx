import React from 'react';

const Footer = () => {
    return (
        <footer style={{ position: 'fixed', left: '0', bottom: '0', width: '100%', backgroundColor: '#f8f9fa', textAlign: 'center', padding: '10px' }}>
            <p>© {new Date().getFullYear()} &apos;George&apos; Yihao Xu &nbsp; |<a className="link" href="http://www.georgeyxu.com" target="_blank" rel="noopener noreferrer">Contact</a></p>
        </footer>
    );
};

export default Footer;
