import Link from "components/ui/Link.tsx";
import {IconHeart} from "@tabler/icons-react";

const HomePage = () => {
    return (
        <>
            <div className='inline-flex gap-2 bg-sky-300 w-full p-10'>
                <Link href='/'>Default</Link>
                <Link variant='primary'>Primary</Link>
                <Link size='full'>Full</Link>

            </div>
            <div className='inline-flex gap-2 bg-sky-300 w-full p-10'>
                <Link variant='underline' size='span'>Underline</Link>
                <Link variant='icon' size='span'><IconHeart/></Link>

            </div>
        </>

    );
};

export default HomePage;