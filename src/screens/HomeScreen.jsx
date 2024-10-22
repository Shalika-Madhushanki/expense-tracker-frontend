import React, { useEffect, useState } from 'react';

// import image from './../assets/grocery.png'
import { Button, Grid, Image, List, ProgressCircle, Space, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { fetchExpenses } from '../services/expenseService';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [expenseList, setExpenseList] = useState([]);
    const [error, setError] = useState("");

    const totalAmount = expenseList.map(item => Number(item.amount)).reduce((acc, curr) => acc + curr, 0);

    useEffect(() => {
        const fetchData = async () => {
            setError("");

            try {
                const data = await fetchExpenses();
                if (data?.length) {
                    setExpenseList(data);
                }
            } catch (error) {
                setError(error.message);
                console.error("Error fetching expenses:", error);
            }
        };
        fetchData();
    }, []);

    // useEffect(() => {
    //     handleError();
    // }, [error]);

    // const handleError = () => {
    //     if (error) {
    //         Toast.show({
    //             content: error,
    //             duration: 3000, // duration in milliseconds
    //             afterClose: () => setError(''), // clear the error after display
    //         });
    //     }
    // };
    return (
        <>
            <div className="top-section">
                <Space style={{ '--gap': '24px' }}>
                    <ProgressCircle
                        percent={(totalAmount / 5000) * 100}
                        style={{
                            '--size': '200px',
                            '--track-width': '4px',
                        }}
                    >
                        < div  > You have spend </ div >
                        <div style={{ fontSize: '20px', lineHeight: '26px' }}>{totalAmount} €</div>
                        <div>this month</div>
                    </ProgressCircle>
                </Space>
            </div>
            <div className="bottom-section">
                < List header={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>History</span>
                        <Button onClick={() => { navigate('/expenses/add') }} color="primary" size="small">Add Expense</Button>
                    </div>
                } >
                     {error && <div style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>{error}</div>}
                    {expenseList.map((record, index) => (
                        <List.Item
                            key={index}
                            prefix={
                                <Image
                                    src={"image"}
                                    style={{ borderRadius: 20 }}
                                    fit="cover"
                                    width={40}
                                    height={40}
                                />
                            }
                            description={record.comments + ' |  ' + ' ' + ' | ' + record.paidBy}
                        >
                            <Grid columns={3} gap={8}>
                                <Grid.Item span={2}>
                                    <div>{record.description}</div>
                                </Grid.Item>
                                <Grid.Item span={1}>
                                    <div style={{ textAlign: 'right', paddingRight: '6px' }}>{record.amount} €</div>
                                </Grid.Item>
                            </Grid>
                        </List.Item>
                    ))}
                </List>
            </div>
        </>
    );
}

export default HomeScreen;