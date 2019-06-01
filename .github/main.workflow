workflow "Build and Deploy" {
  on = "push"
  resolves = ["GitHub Action for Heroku", "GitHub Action for Zeit"]
}

action "GitHub Action for Heroku" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  secrets = ["GITHUB_TOKEN"]
}

action "GitHub Action for Zeit" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
}
