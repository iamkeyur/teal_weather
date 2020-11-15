import './App.css';
import Weather from './components/weather/weather';
import 'antd/dist/antd.css';
import * as actions from './store/actions';
import { Layout, Input } from 'antd';
import { useEffect } from 'react';
import * as React from 'react';
import { useDispatch, connect } from 'react-redux';
const { Header, Content, Footer } = Layout;

function App(props) {
    const dispatch = useDispatch();
    const [last, setLast] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState(props.weatherLocation);
    useEffect(() => {
        dispatch(actions.weatherFetchRequested('Montreal'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPressEnter = (e) => {
        if (last.includes(e.target.value.toLowerCase()) !== true) {
            if (last.length == 5) {
                setLast([...last.slice(1), e.target.value.toLowerCase()]);
            } else {
                setLast([...last, e.target.value.toLowerCase()]);
            }
        }

        setSearchTerm(e.target.value.toLowerCase());
        dispatch(actions.weatherFetchRequested(e.target.value.toLowerCase()));
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const onClickSearch = (t) => {
        setSearchTerm(t.toLowerCase());
        dispatch(actions.weatherFetchRequested(t));
    };

    const items = last.map((item) => (
        <li key={item} onClick={onClickSearch.bind(this, item)}>
            {item}
        </li>
    ));

    return (
        <Layout>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Input
                    style={{
                        width: '55%',
                        textAlign: 'center',
                        WebkitBorderRadius: '25px',
                        MozBorderRadius: '25px',
                        borderRadius: '25px',
                        textTransform: 'capitalize',
                    }}
                    value={searchTerm}
                    onPressEnter={onPressEnter}
                    onChange={handleChange}
                />
            </Header>
            <Content className="site-layout" style={{ padding: '16px 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: '75vh' }}>
                    <Weather
                        isLoading={props.isLoading}
                        weatherData={props.weatherData}
                        errorMessage={props.errorMessage}
                        weatherLocation={props.weatherLocation}
                        lastSearches={items}
                    />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Keyur Patel.</Footer>
        </Layout>
    );
}
function mapStateToProps(state) {
    const { weatherData, errorMessage, isLoading, weatherLocation } = state;
    const props = {
        weatherData,
        errorMessage,
        isLoading,
        weatherLocation,
    };
    return props;
}

const AppWithRedux = connect(mapStateToProps)(App);
export default AppWithRedux;
