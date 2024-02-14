import AppRouter from './components/AppRouter/AppRouter'
import './styles/styles.module.scss'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
	// const dispatch = useAppDispatch()
	// useEffect(() => {
	// 	dispatch(fetchInterviews())
	// 	dispatch(fetchSpecialists())
	// 	dispatch(fetchSkills())
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export default App
