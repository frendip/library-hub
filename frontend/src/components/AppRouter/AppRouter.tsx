import {Routes, Route} from 'react-router-dom';
import Layout from '../Layout/Layout';
import Readers from '../../pages/Readers/Readers';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<div> Main Page</div>} />
                <Route path="/readers" element={<Readers />} />
                <Route path="/books" element={<div>Books</div>} />
                <Route path="*" element={<div>Not found</div>} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
