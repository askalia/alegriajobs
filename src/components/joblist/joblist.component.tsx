const JobList = () => <div>JOBLIST</div>;

export default JobList;

//import { setJoblist } from "store/joblist/joblist.actions";

/*
class Joblist extends Component<IMapStateToJoblistProps> {
  componentDidMount() {
    const { setJoblist } = this.props as IJoblistDispatchers;
    setJoblist();
  }

  render() {
    const { jobList } = this.props as IMapStateToJoblistProps;
    return <div>JobList table {(jobList || []).length}</div>;
  }
}

type IMapStateToJoblistProps = {
  jobList: Job[];
};

const mapStateToProps = (rootState: RootState) => ({
  jobList: rootState.jobList,
});

export default connect(mapStateToProps, JoblistDispatchers)(Joblist);
*/
