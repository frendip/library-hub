import { Routes, Route } from 'react-router-dom'
import Layout from '../Layout/Layout'

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<div> Main Page</div>} />
				<Route path='/readers' element={<div>Readers</div>} />
				<Route path='/books' element={<div>Books</div>} />
				<Route path='*' element={<div>Not found</div>} />
			</Route>
		</Routes>
	)
}

export default AppRouter
