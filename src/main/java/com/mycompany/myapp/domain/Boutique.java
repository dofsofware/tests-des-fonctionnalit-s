package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Boutique.
 */
@Entity
@Table(name = "boutique")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Boutique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private Integer telephone;

    @Column(name = "created")
    private ZonedDateTime created;

    @Lob
    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(unique = true)
    private Photo photo;

    @OneToOne
    @JoinColumn(unique = true)
    private Utilisateur administateur;

    @OneToMany(mappedBy = "boutique")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Photo> photos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresse() {
        return adresse;
    }

    public Boutique adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Integer getTelephone() {
        return telephone;
    }

    public Boutique telephone(Integer telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(Integer telephone) {
        this.telephone = telephone;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public Boutique created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public String getDescription() {
        return description;
    }

    public Boutique description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Photo getPhoto() {
        return photo;
    }

    public Boutique photo(Photo photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(Photo photo) {
        this.photo = photo;
    }

    public Utilisateur getAdministateur() {
        return administateur;
    }

    public Boutique administateur(Utilisateur utilisateur) {
        this.administateur = utilisateur;
        return this;
    }

    public void setAdministateur(Utilisateur utilisateur) {
        this.administateur = utilisateur;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public Boutique photos(Set<Photo> photos) {
        this.photos = photos;
        return this;
    }

    public Boutique addPhotos(Photo photo) {
        this.photos.add(photo);
        photo.setBoutique(this);
        return this;
    }

    public Boutique removePhotos(Photo photo) {
        this.photos.remove(photo);
        photo.setBoutique(null);
        return this;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Boutique)) {
            return false;
        }
        return id != null && id.equals(((Boutique) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Boutique{" +
            "id=" + getId() +
            ", adresse='" + getAdresse() + "'" +
            ", telephone=" + getTelephone() +
            ", created='" + getCreated() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
