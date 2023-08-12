import {useUser} from "../context/UserContext.jsx";
import './msg-banner.css';
import {motion} from "framer-motion";

export default function MsgBanner() {
    const {banner} = useUser();
    return (
        <motion.div
            key={banner}
            initial={{y: -100, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{type: 'spring', stiffness: 50}}
            className="msg-banner-container">
            <span>
                {banner}
            </span>
        </motion.div>
    )
}
