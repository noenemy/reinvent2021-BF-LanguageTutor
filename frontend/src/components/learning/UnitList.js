import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class UnitList extends Component {
    state = {
        units: null,
        loading: false
    };

    componentDidMount() {
        this.getLectureUnits();
    }

    async getLectureUnits(courseId=1, lectureId=1) {
        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/course/lectures/units?courseId=${courseId}&lectureId=${lectureId}`;
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res !== null) {
            this.setState({ units: res.data.units });
            console.log(res.data.units);
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    render() {
        return (
            <div>
                {this.state.loading ? <h3>Loading...</h3> : null}
                <ul className="list-group list-group-horizontal">
                {this.state.units && this.state.units.map(( unit, index) => {
                    return (
                        <li className="list-group-item flex-fill" key={unit.unit_id}>
                            { unit.unit_title }
                        </li>
                        );
                })}
                </ul>
            </div>
        );
    }
}

export default UnitList;