package com.example.rest;
/**
 * @COPYRIGHT (C) 2016 Schenker AG
 *
 * All rights reserved
 */

import com.example.to.BookTo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * TODO The class BooksRestService is supposed to be documented...
 *
 * @author TSZEWCOW
 */
@RequestMapping("/services")
@RestController
public class BooksRestService {

    private final List<BookTo> books = new ArrayList<>();

    @RequestMapping(value = "/books", method = RequestMethod.GET)
    @ResponseBody
    public List<BookTo> getBooks() {
        return books;
    }

    @RequestMapping(value = "/book", method = RequestMethod.DELETE)
    public void deleteBook(@RequestParam("id") long id) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getId() == id) {
                books.remove(i);
                return;
            }
        }
    }

    @RequestMapping(value = "/book", method = RequestMethod.POST)
    public BookTo addBook(@RequestBody BookTo book) {
        final long id = books.get(books.size() - 1).getId() + 1;
        book.setId(id);
        books.add(book);
        return book;
    }

    @RequestMapping(value = "/book", method = RequestMethod.PUT)
    public BookTo editBook(@RequestBody BookTo book) {
        for (BookTo nextBook : books) {
            if (nextBook.getId() == book.getId()) {
                nextBook.setGenre(book.getGenre());
                nextBook.setAuthor(book.getAuthor());
                nextBook.setTitle(book.getTitle());
                nextBook.setYear(book.getYear());
                nextBook.setVersion(book.getVersion() + 1);
            }
        }
        return book;
    }

    @PostConstruct
    private void createBooks() {
        books.add(createBook(0, "Code Complete", "Steve McConnell", "it", 1999));
        books.add(createBook(1, "Python. Wprowadzenie", "Mike Lutz, David Ascher", "it", 2001));
        books.add(createBook(2, "Sztuka Programowania", "Donald Knuth", "it", 2013));
        books.add(createBook(3, "Pragmatyczny Programista", "Andy Hunt, Dave Thomas", "it", 2003));
        books.add(createBook(4, "Wzorce Projektowe", "Erich Gamma, Ralph Johnson, Richard Helm, John Vissides", "it", 2003));
    }

    private BookTo createBook(long id, String title, String author, String genre, int year) {
        BookTo book = new BookTo();
        book.setId(id);
        book.setVersion(0);
        book.setTitle(title);
        book.setAuthor(author);
        book.setGenre(genre);
        book.setYear(year);
        return book;
    }
}