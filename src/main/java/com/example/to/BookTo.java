package com.example.to;
/**
 * @COPYRIGHT (C) 2016 Schenker AG
 *
 * All rights reserved
 */

/**
 * TODO The class BookTo is supposed to be documented...
 *
 * @author TSZEWCOW
 */
public class BookTo {

    private long id;
    private long version;
    private String title;
    private String author;
    private String genre;
    private int year;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
