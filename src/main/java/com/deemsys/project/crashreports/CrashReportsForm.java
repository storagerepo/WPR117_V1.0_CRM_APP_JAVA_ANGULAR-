package com.deemsys.project.crashreports;

import java.util.Date;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.springframework.web.multipart.MultipartFile;

import com.deemsys.project.occupants.OccupantsForm;

/**
 * 
 * @author Deemsys
 *
 */
public class CrashReportsForm {

	private String reportId;
	private String reportNumber;
	private String crashDate;
	private MultipartFile crashReport;
	private String addedDate;
	private String addedDateTime;
	private Integer status;
	private List<OccupantsForm> occupantsForms;
	
	public String getReportId() {
		return reportId;
	}

	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	public String getReportNumber() {
		return reportNumber;
	}

	public void setReportNumber(String reportNumber) {
		this.reportNumber = reportNumber;
	}

	public String getCrashDate() {
		return crashDate;
	}

	public void setCrashDate(String crashDate) {
		this.crashDate = crashDate;
	}

	public MultipartFile getCrashReport() {
		return crashReport;
	}

	public void setCrashReport(MultipartFile crashReport) {
		this.crashReport = crashReport;
	}

	public String getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(String addedDate) {
		this.addedDate = addedDate;
	}

	public String getAddedDateTime() {
		return addedDateTime;
	}

	public void setAddedDateTime(String addedDateTime) {
		this.addedDateTime = addedDateTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public List<OccupantsForm> getOccupantsForms() {
		return occupantsForms;
	}

	public void setOccupantsForms(List<OccupantsForm> occupantsForms) {
		this.occupantsForms = occupantsForms;
	}

	public CrashReportsForm(String reportId, String reportNumber,
			String crashDate, MultipartFile crashReport, String addedDate,
			String addedDateTime, Integer status,
			List<OccupantsForm> occupantsForms) {
		super();
		this.reportId = reportId;
		this.reportNumber = reportNumber;
		this.crashDate = crashDate;
		this.crashReport = crashReport;
		this.addedDate = addedDate;
		this.addedDateTime = addedDateTime;
		this.status = status;
		this.occupantsForms = occupantsForms;
	}

	public CrashReportsForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
