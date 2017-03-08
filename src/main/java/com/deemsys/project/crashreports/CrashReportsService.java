package com.deemsys.project.crashreports;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.deemsys.project.AWS.AWSFileUpload;
import com.deemsys.project.accounts.AccountsDAO;
import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.common.CRMProperties;
import com.deemsys.project.entity.Accounts;
import com.deemsys.project.entity.CrashReports;
import com.deemsys.project.entity.Occupants;
import com.deemsys.project.entity.OccupantsId;
import com.deemsys.project.login.LoginService;
import com.deemsys.project.occupants.OccupantsDAO;
import com.deemsys.project.occupants.OccupantsForm;
/**
 * 
 * @author Deemsys
 *
 * CrashReports 	 - Entity
 * crashReports 	 - Entity Object
 * crashReportss 	 - Entity List
 * crashReportsDAO   - Entity DAO
 * crashReportsForms - EntityForm List
 * CrashReportsForm  - EntityForm
 *
 */
@Service
@Transactional
public class CrashReportsService {

	@Autowired
	CrashReportsDAO crashReportsDAO;
	
	@Autowired
	LoginService loginService;
	
	@Autowired
	AccountsDAO accountsDAO;
	
	@Autowired
	OccupantsDAO occupantsDAO;
	
	@Autowired
	AWSFileUpload awsFileUpload;
	
	@Autowired
	CRMProperties crmProperties;
	
	//Get All Entries
	public CrashReportsSearchResult searchCrashReportsList(CrashReportSearchForm crashReportSearchForm)
	{
		CrashReportsSearchResult crashReportsSearchResult = new CrashReportsSearchResult();
		
		if(!crashReportSearchForm.getAccountId().equals("0"))
		  crashReportSearchForm.setAccountId(loginService.getCurrentAccountId());
		
		CrashReportsSearchResultSet crashReportsSearchResultSet=crashReportsDAO.searchCrashReports(crashReportSearchForm);
		
		String reportId="";
		int rowCount=0;
		List<CrashReportsResultByGroup> crashReportsResultByGroupList = new ArrayList<CrashReportsResultByGroup>();
		CrashReportsResultByGroup crashReportsResultByGroup = new CrashReportsResultByGroup();
		for (CrashReportSearchList crashReportSearchList : crashReportsSearchResultSet.getCrashReportSearchLists()) {
			//TODO: Fill the List
			if(!reportId.equals(crashReportSearchList.getReportId())){
				reportId=crashReportSearchList.getReportId();
				if(rowCount!=0){
					crashReportsResultByGroupList.add(crashReportsResultByGroup);
				}
				crashReportsResultByGroup=new CrashReportsResultByGroup(crashReportSearchList.getReportId(), crashReportSearchList.getReportNumber(), crashReportSearchList.getCrashDate(), crashReportSearchList.getLocation(), crashReportSearchList.getAddedDate(), crashReportSearchList.getAddedDateTime(), crashReportSearchList.getStatus(), crashReportSearchList.getFileName(), new ArrayList<OccupantsForm>());
			}
			// Set Occupants
			crashReportsResultByGroup.getOccupantsForms().add(new OccupantsForm(crashReportSearchList.getFirstName(), crashReportSearchList.getLastName(), 1));
			rowCount++;
		}
		if(rowCount>0)
			crashReportsResultByGroupList.add(crashReportsResultByGroup);

		crashReportsSearchResult=new CrashReportsSearchResult(crashReportsSearchResultSet.getTotalRecords(), crashReportsResultByGroupList);
		
		return crashReportsSearchResult;
	}
	
	//Get Particular Entry
	public CrashReportsForm getCrashReports(String reportId)
	{
		CrashReports crashReports=crashReportsDAO.getReportsByReportId(reportId);
		
		//TODO: Convert Entity to Form
		//Start
		List<OccupantsForm> occupantsForms = new ArrayList<OccupantsForm>();
		List<Occupants> occupants = occupantsDAO.getOccupantsByReportId(reportId);
		for (Occupants occupant : occupants) {
			OccupantsForm occupantsForm = new OccupantsForm(occupant.getId().getFirstName(), occupant.getId().getLastName(), occupant.getId().getStatus());
			occupantsForms.add(occupantsForm);
		}
		
		CrashReportsForm crashReportsForm=new CrashReportsForm(crashReports.getReportId(), crashReports.getReportNumber(), CRMConstants.convertMonthFormat(crashReports.getCrashDate()), crashReports.getLocation(), crashReports.getFileName(), CRMConstants.convertMonthFormat(crashReports.getAddedDate()), CRMConstants.convertUSAFormatWithTime(crashReports.getAddedDateTime()), crashReports.getStatus(), occupantsForms);
		
		//End
		
		return crashReportsForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergeCrashReports(CrashReportsForm crashReportsForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		try {
			Accounts accounts = accountsDAO.getAccountsById(loginService.getCurrentAccountId());
			
			CrashReports crashReports=new CrashReports(crashReportsForm.getReportId(), accounts, crashReportsForm.getReportNumber(),  CRMConstants.convertYearFormat(crashReportsForm.getCrashDate()), crashReportsForm.getLocation(), null,  new Date(), new Date(), 1, null);

			crashReportsDAO.merge(crashReports);

			// Delete Occupants 
			occupantsDAO.deleteOccupantsByReportId(crashReportsForm.getReportId());
			
			// Insert Occupants
			for (OccupantsForm occupantsForm : crashReportsForm.getOccupantsForms()) {
				OccupantsId occupantsId = new OccupantsId(crashReports.getReportId(), occupantsForm.getFirstName(), occupantsForm.getLastName(), 1);
				Occupants occupants = new Occupants(occupantsId, crashReports);
				occupantsDAO.save(occupants);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		//Logic Ends
		
		return 1;
	}
	
	//Save an Entry
	public int saveCrashReports(CrashReportsForm crashReportsForm) throws Exception
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		try {
			Accounts accounts = accountsDAO.getAccountsById(loginService.getCurrentAccountId());
			
			CrashReports crashReports=new CrashReports(crashReportsForm.getReportId(), accounts, crashReportsForm.getReportNumber(),  CRMConstants.convertYearFormat(crashReportsForm.getCrashDate()), crashReportsForm.getLocation(), null,  new Date(), new Date(), 1, null);

			crashReportsDAO.saveCrashReports(crashReports);

			for (OccupantsForm occupantsForm : crashReportsForm.getOccupantsForms()) {
				OccupantsId occupantsId = new OccupantsId(crashReports.getReportId(), occupantsForm.getFirstName(), occupantsForm.getLastName(), 1);
				Occupants occupants = new Occupants(occupantsId, crashReports);
				occupantsDAO.save(occupants);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//Logic Ends
		
		return 1;
	}
	
	public String uploadCrashReport(MultipartFile crashReport,String reportNumber) throws Exception{
		
		String uuid= UUID.randomUUID().toString().replaceAll("-", "");
		String fileName= uuid+"_"+reportNumber+".pdf";
		String filePath=crmProperties.getProperty("tempFolder")+fileName;
		try {
			// Write File Temp Folder
			File file=CRMConstants.saveTemporaryFile(crashReport, filePath);
			// Upload File To AWS S3
			awsFileUpload.uploadFileToAWSS3(filePath, fileName);
			
			// File Delete in Temp Folder
			file.delete();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return uuid;
	}
	
	//Update an Entry
	public int updateCrashReports(CrashReportsForm crashReportsForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		CrashReports crashReports=new CrashReports();
		
		//Logic Ends
		
		crashReportsDAO.update(crashReports);
		return 1;
	}
	
	//Delete an Entry
	public int deleteCrashReports(String reportId)
	{
		CrashReports crashReports = crashReportsDAO.getReportsByReportId(reportId);
		String fileName=crashReports.getFileName();
		// Delete File In AWS S3
		try {
			awsFileUpload.deleteFileFromAWSS3(fileName);
			// Delete In DB
			crashReportsDAO.deleteCrashReports(crashReports);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 1;
	}
	
	
	
}