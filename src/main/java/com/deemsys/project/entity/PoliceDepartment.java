package com.deemsys.project.entity;

// Generated 29 May, 2017 1:29:31 PM by Hibernate Tools 3.4.0.CR1

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * PoliceDepartment generated by hbm2java
 */
@Entity
@Table(name = "police_department", catalog = "CRM_boardman")
public class PoliceDepartment implements java.io.Serializable {

	private Integer policeDepartmentId;
	private County county;
	private String name;
	private String code;
	private String loginLink;
	private String searchLink;
	private Date createdDateTime;
	private Integer status;
	private Integer isEnabled;
	private Set<Accounts> accountses = new HashSet<Accounts>(0);
	private Set<CrashReports> crashReportses = new HashSet<CrashReports>(0);

	public PoliceDepartment() {
	}

	public PoliceDepartment(County county, String name, String code,
			String loginLink, String searchLink, Date createdDateTime,
			Integer status,Integer isEnabled, Set<Accounts> accountses,
			Set<CrashReports> crashReportses) {
		this.county = county;
		this.name = name;
		this.code = code;
		this.loginLink = loginLink;
		this.searchLink = searchLink;
		this.createdDateTime = createdDateTime;
		this.status = status;
		this.isEnabled=isEnabled;
		this.accountses = accountses;
		this.crashReportses = crashReportses;
	
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "police_department_id", unique = true, nullable = false)
	public Integer getPoliceDepartmentId() {
		return this.policeDepartmentId;
	}

	public void setPoliceDepartmentId(Integer policeDepartmentId) {
		this.policeDepartmentId = policeDepartmentId;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "county_id")
	public County getCounty() {
		return this.county;
	}

	public void setCounty(County county) {
		this.county = county;
	}

	@Column(name = "name", length = 60)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "code", length = 45)
	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	
	@Column(name = "is_enabled")
	public Integer getIsEnabled() {
		return this.isEnabled;
	}

	public void setIsEnabled(Integer isEnabled) {
		this.isEnabled=isEnabled;
	}
	@Column(name = "login_link", length = 45)
	public String getLoginLink() {
		return this.loginLink;
	}

	public void setLoginLink(String loginLink) {
		this.loginLink = loginLink;
	}

	@Column(name = "search_link", length = 45)
	public String getSearchLink() {
		return this.searchLink;
	}

	public void setSearchLink(String searchLink) {
		this.searchLink = searchLink;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", length = 19)
	public Date getCreatedDateTime() {
		return this.createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	@Column(name = "status")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "policeDepartment")
	public Set<Accounts> getAccountses() {
		return this.accountses;
	}

	public void setAccountses(Set<Accounts> accountses) {
		this.accountses = accountses;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "policeDepartment")
	public Set<CrashReports> getCrashReportses() {
		return this.crashReportses;
	}

	public void setCrashReportses(Set<CrashReports> crashReportses) {
		this.crashReportses = crashReportses;
	}

	
}
