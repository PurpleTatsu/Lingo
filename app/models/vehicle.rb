class Vehicle < ApplicationRecord
  belongs_to :user, optional: true
  has_many :flashcards
end
