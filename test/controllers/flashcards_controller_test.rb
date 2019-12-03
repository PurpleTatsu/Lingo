require 'test_helper'

class FlashcardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @flashcard = flashcards(:one)
  end

  test "should get index" do
    get flashcards_url, as: :json
    assert_response :success
  end

  test "should create flashcard" do
    assert_difference('Flashcard.count') do
      post flashcards_url, params: { flashcard: { description: @flashcard.description, vocab: @flashcard.vocab, vocab2: @flashcard.vocab2, vocab3: @flashcard.vocab3 } }, as: :json
    end

    assert_response 201
  end

  test "should show flashcard" do
    get flashcard_url(@flashcard), as: :json
    assert_response :success
  end

  test "should update flashcard" do
    patch flashcard_url(@flashcard), params: { flashcard: { description: @flashcard.description, vocab: @flashcard.vocab, vocab2: @flashcard.vocab2, vocab3: @flashcard.vocab3 } }, as: :json
    assert_response 200
  end

  test "should destroy flashcard" do
    assert_difference('Flashcard.count', -1) do
      delete flashcard_url(@flashcard), as: :json
    end

    assert_response 204
  end
end
