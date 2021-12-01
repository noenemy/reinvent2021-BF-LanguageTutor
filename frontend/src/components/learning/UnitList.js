import React, { Component } from 'react';

class UnitList extends Component {

    render() {

        return (
            <div className="row">

                <ul className="list-group list-group-horizontal" >

                {this.props.units && this.props.units.map(( unit, index) => {
                    return (
                        <li className={ this.props.currentUnitIndex===index+1 ? 'list-group-item flex-fill list-group-item-success' : 'list-group-item flex-fill' }
                            key={unit.id} value={unit.unit_order} onClick={this.props.onClickUnit}>
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