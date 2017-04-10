package com.deemsys.project.entity;

// Generated 10 Apr, 2017 12:35:32 PM by Hibernate Tools 3.4.0.CR1

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Occupants generated by hbm2java
 */
@Entity
@Table(name = "occupants", catalog = "CRM_boardman")
public class Occupants implements java.io.Serializable {

	private OccupantsId id;
	private CrashReports crashReports;

	public Occupants() {
	}

	public Occupants(OccupantsId id, CrashReports crashReports) {
		this.id = id;
		this.crashReports = crashReports;
	}

	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "reportId", column = @Column(name = "report_id", nullable = false, length = 32)),
			@AttributeOverride(name = "firstName", column = @Column(name = "first_name", length = 50)),
			@AttributeOverride(name = "lastName", column = @Column(name = "last_name", length = 50)),
			@AttributeOverride(name = "sequenceNo", column = @Column(name = "sequence_no")),
			@AttributeOverride(name = "status", column = @Column(name = "status")) })
	public OccupantsId getId() {
		return this.id;
	}

	public void setId(OccupantsId id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "report_id", nullable = false, insertable = false, updatable = false)
	public CrashReports getCrashReports() {
		return this.crashReports;
	}

	public void setCrashReports(CrashReports crashReports) {
		this.crashReports = crashReports;
	}

}
