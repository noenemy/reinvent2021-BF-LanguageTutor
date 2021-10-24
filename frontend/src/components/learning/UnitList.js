import React, { Component } from 'react';

class UnitList extends Component {

    render() {

        return (
            <div className="row">
                {this.props.loading ? <h3>Loading...</h3> : null}
                <ul className="list-group list-group-horizontal" >

                {this.props.units && this.props.units.map(( unit, index) => {
                    return (
                        <li className={ this.props.selectedUnit===index+1 ? 'list-group-item flex-fill list-group-item-success' : 'list-group-item flex-fill' }
                            key={unit.unit_id} value={unit.unit_id} onClick={this.props.onClickUnit}>
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