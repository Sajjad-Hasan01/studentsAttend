import SortBtn from "./SortBtn"
import GroupBtn from "./GroupBtn"
import StatusBtn from "./StatusBtn"

const FilterBar = ({sortHandler, filterGroupsHandler, filterStatusHandler}) => {

  return (
    <section className="filter-bar">
        <SortBtn sortHandler={sortHandler}/>
        <div className="groupCon">
            <GroupBtn label={'a'} filterHandler={filterGroupsHandler}/>
            <GroupBtn label={'b'} filterHandler={filterGroupsHandler}/>
            <GroupBtn label={'c'} filterHandler={filterGroupsHandler}/>
            <GroupBtn label={'d'} filterHandler={filterGroupsHandler}/>
            <GroupBtn label={'e'} filterHandler={filterGroupsHandler}/>
        </div>
        <div className="statusCon">
            <StatusBtn label={'Continuous'} filterHandler={filterStatusHandler}/>
            <StatusBtn label={'Warning'} filterHandler={filterStatusHandler}/>
            <StatusBtn label={'Separation'} filterHandler={filterStatusHandler}/>
        </div>
    </section>
  )
}

export default FilterBar