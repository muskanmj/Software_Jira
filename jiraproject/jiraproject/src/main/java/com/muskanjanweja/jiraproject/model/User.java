package com.muskanjanweja.jiraproject.model;
import java.util.Date;

import jakarta.persistence.*;


@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String BoardId;

    private String information;
    @Temporal(TemporalType.DATE)
    private Date date = new Date(System.currentTimeMillis());

    public User() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBoardId(String BoardId) {
        this.BoardId = BoardId;
    }

    public String getBoardId(){
        return BoardId;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
