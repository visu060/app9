import { JobType } from '../job-type/job-type';
import { Location } from '../location/location';
import { Board } from '../board/board';
// import { PreferredBoard } from '../preferred-board/preferred-board';
import { BoardService } from '../board/board.service';

export class JobSeeker{
      id;
	  firstName;
	  lastName;
	  dob;
      gender; 
	  isMarried; 
	  jobType:JobType;
	  profilePicUrl;
	  aadharNo;
      panNo;
	  currentLocation:Location;
      yearsOfExp;
	  profileSummary;
      email;
	  currentPassword;
	  boards : Board[];
	//   boards : []
	

}